/* eslint-disable no-inline-comments */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import express from 'express'
import { OAuth } from 'oauth'
import url from 'url'
import client from '../../redis.js'
// import { createClient } from 'redis'
import dotenv from 'dotenv'

dotenv.config()
const app = new express();

app.listen(8080);

app.use(express.static('public'));

// client.on('error', err => console.log('Redis Client Error', err));

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
		const interactionUserId = interaction.user.id;

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

		const callback = async function(req, res) {
			const query = url.parse(req.url, true).query;
			const userDataId = "data:" + interactionUserId;
			const userBoardsId = "boards:" + interactionUserId;
			const token = query.oauth_token;
			const tokenSecret = oauth_secrets[token];
			const verifier = query.oauth_verifier;

			const usuario = {
				oauthToken: token,
				oauthTokenSecret: tokenSecret,
				oauthVerifier: verifier
			}

			await client.hSet(userDataId, usuario)
			
			oauth.getOAuthAccessToken(token, tokenSecret, verifier, async function(error, accessToken, accessTokenSecret, results) {

				console.log('QUERY')

				await client.hSet(userDataId, 'accessToken', accessToken)
				
				oauth.getProtectedResource('https://api.trello.com/1/members/me', 'GET', accessToken, accessTokenSecret, async function(error, data, response) {
					

					const dataObject = JSON.parse(data)
					const boardsObject = { ...dataObject.idBoards }

					const secretData = {
						id: dataObject.id,
						url: dataObject.url,
						totalBoards: dataObject.idBoards.length,
						userBoardsId: userBoardsId						
					}

					console.log('USUARIO')

					console.log(usuario)

					await client.hSet(userDataId, secretData)

					const maria = await client.hGetAll(userDataId);

					console.log(maria)

					await client.hSet(userBoardsId, boardsObject)

					res.send('<h1>¡Listo! Podés volver a Discord.</h1>');
					
					client.quit();

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
					.setStyle(ButtonStyle.Link)
			);


		await interaction.reply({ content: 'Necesitamos algunos permisos', components: [row], ephemeral: true });
	},
};