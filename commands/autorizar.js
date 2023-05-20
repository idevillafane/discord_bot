/* eslint-disable no-inline-comments */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import express from 'express'
import { OAuth } from 'oauth'
import TrelloNodeApi from 'trello-node-api';
import url from 'url'
import client from '../redis.js'
import dotenv from 'dotenv'
import { setTrelloToken } from '../utils/setTrelloToken.js';
dotenv.config()
const trello = new TrelloNodeApi;
/*
trello.setApiKey(process.env.TRELLO_API_KEY);

const app = new express();
app.listen(8080);
app.use(express.static('public'));

const requestURL = 'https://trello.com/1/OAuthGetRequestToken';
const accessURL = 'https://trello.com/1/OAuthGetAccessToken';
const authorizeURL = 'https://trello.com/1/OAuthAuthorizeToken';
const appName = 'El bot de Mirtha';
const scope = 'read,write';
const expiration = 'never';

const key = process.env.TRELLO_API_KEY;
const secret =   process.env.TRELLO_OAUTH_SECRET;

const loginCallback = 'http://localhost:8080/callback';

*/
export default {

	data: new SlashCommandBuilder()
		.setName('autorizar')
		.setDescription('Autorizar acceso a Trello mediante OAuth'),

	async execute(interaction) {

			await setTrelloToken(interaction);

	}

	
};

		/*

		await client.connect();

		await client.set(`discord-user-name:${interaction.user.id}`, interaction.user.username)

		const oauth = new OAuth(requestURL, accessURL, key, secret, '1.0A', loginCallback, 'HMAC-SHA1');

		const login = function(request, response) {

			oauth.getOAuthRequestToken( async function(error, token, tokenSecret, results) {

				await client.hSet(`oauth-data:${interaction.user.id}`, 'token', token)
				await client.hSet(`oauth-data:${interaction.user.id}`, 'secret', tokenSecret)

				response.redirect(`${authorizeURL}?oauth_token=${token}&name=${appName}&scope=${scope}&expiration=${expiration}`);

				await client.quit();

			});
		};

		const callback = async function(req, res) {

			await client.connect()

			const query = url.parse(req.url, true).query;

			const token = query.oauth_token;
			const tokenSecret = await client.hGet(`oauth-data:${interaction.user.id}`, 'secret');
			const verifier = query.oauth_verifier;

			oauth.getOAuthAccessToken(token, tokenSecret, verifier, async function(error, accessToken, accessTokenSecret, results) {

				console.log(accessToken)

				trello.setOauthToken(accessToken);

				const trelloMe = await trello.member.search('me');

				console.log(accessToken)

				await client.set(`trello-access-token:${interaction.user.id}`, accessToken);

				await interaction.editReply({ content: `Accediste a Trello como ${trelloMe.fullName}.\n(Nombre de usuario: ${trelloMe.username})`, components: [], ephemeral: true });

				res.send('<h1> Listo. Ya podes volver a Discord. </h1>');

				await client.quit();

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
		

		//const row = await login(interaction);

		await interaction.reply({ content: 'Necesitamos algunos permisos', components: [row], ephemeral: true });
	},
	
};
	/*/

