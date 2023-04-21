/* eslint-disable no-inline-comments */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import express from 'express'
import { OAuth } from 'oauth'
import url from 'url'
import { createClient } from 'redis'
import dotenv from 'dotenv'

dotenv.config()
const client = createClient();
const app = new express();

app.listen(8080);

app.use(express.static('public'));

client.on('error', err => console.log('Redis Client Error', err));

export default {
	data: new SlashCommandBuilder()
		.setName('autorizar')
		.setDescription('Autorizar acceso a Trello mediante OAuth'),
	async execute(interaction) {

		await client.connect();

		//   VARIABLES DE OAUTH - Pasar luego a config.json

		const requestURL = 'https://trello.com/1/OAuthGetRequestToken';
		const accessURL = 'https://trello.com/1/OAuthGetAccessToken';
		const authorizeURL = 'https://trello.com/1/OAuthAuthorizeToken';
		const appName = 'El bot de Mirtha';
		const scope = 'read';
		const expiration = 'never';

		// FIN DE VARIABLES DE OAUTH { }

		const key = process.env.TRELLO_API_KEY;
		const secret =   process.env.TRELLO_OAUTH_SECRET;

		const loginCallback = 'http://localhost:8080/callback';

		const oauth_secrets = {};

		const oauth = new OAuth(requestURL, accessURL, key, secret, '1.0A', loginCallback, 'HMAC-SHA1');

		const login = function(request, response) {
			oauth.getOAuthRequestToken(function(error, token, tokenSecret, results) {
				oauth_secrets[token] = tokenSecret; // TODO Pasar esto a DB (Se usa en callback())
				response.redirect(`${authorizeURL}?oauth_token=${token}&name=${appName}&scope=${scope}&expiration=${expiration}`);
			});
		};

		const callback = function(req, res) {
			const query = url.parse(req.url, true).query;
			const token = query.oauth_token;
			const tokenSecret = oauth_secrets[token]; // TODO Pasar esto a DB (Viene de login())
			const verifier = query.oauth_verifier;
			oauth.getOAuthAccessToken(token, tokenSecret, verifier, function(error, accessToken, accessTokenSecret, results) {

				oauth.getProtectedResource('https://api.trello.com/1/members/me', 'GET', accessToken, accessTokenSecret, async function(error, data, response) {

					await client.set(interaction.user.username, data);
					res.send('<h1>¡Listo! Podés volver a Discord.</h1>');
					await client.quit();
				});
			});
		};

		app.get('/login', function(request, response) {

			login(request, response);
		});

		app.get('/callback', function(request, response) {

			callback(request, response);
		});

		const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('Accedé a Trello')
					.setURL('http://localhost:8080/login')
					.setStyle(ButtonStyle.Link),
			);


		await interaction.reply({ content: 'Necesitamos algunos permisos', components: [row] });
	},
};