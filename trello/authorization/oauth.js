import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import { redisHGetAllTrelloAccess, redisHSetTrelloAccess } from '../../redis_db/redis.js';
import { OAuth } from 'oauth'
import express from 'express'
import url from 'url'
import dotenv from 'dotenv'

/**
 * ESTA CLASE SIRVE PARA REALIZAR LA AUTENTICACIÓN DEL ACCESO DEL USUARIO DE DISCORD A TRELLO MEDIANTE OAUTH
 * ALMACENA LOS VALORES DE LOS TOKENS EN UNA BASE DE DATOS DE REDIS
 *  */

export async function setToken(interaction) {

    dotenv.config()

    const app = new express();
    app.listen(process.env.DISCORDJS_PORT);
    app.use(express.static('public'));

    const requestURL = 'https://trello.com/1/OAuthGetRequestToken';
    const accessURL = 'https://trello.com/1/OAuthGetAccessToken';
    const authorizeURL = 'https://trello.com/1/OAuthAuthorizeToken';
    const appName = 'El bot de Mirtha';
    const scope = 'read,write';
    const expiration = 'never';

    const key = process.env.TRELLO_API_KEY;
    const secret = process.env.TRELLO_OAUTH_SECRET;
    const host = process.env.DISCORDJS_HOST;

    const loginCallback = `http://${host}:8080/callback`;

    const oauth = new OAuth(requestURL, accessURL, key, secret, '1.0A', loginCallback, 'HMAC-SHA1');

    let tokenSecretCache;

    const login = function(request, response) {

        oauth.getOAuthRequestToken( async function(error, token, tokenSecret, results) {


           // console.log('aaaaa' + token) oauth_token=${token}&

            tokenSecretCache = tokenSecret;

            response.redirect(`${authorizeURL}?oauth_token=${token}&name=${appName}&scope=${scope}&expiration=${expiration}`);

        });
    };

    const callback = async function(req, res) {

        const query = url.parse(req.url, true).query;

        const token = query.oauth_token;

        const verifier = query.oauth_verifier;

        oauth.getOAuthAccessToken(token, tokenSecretCache, verifier, async function(error, accessToken, accessTokenSecret, results) {

            await redisHSetTrelloAccess(interaction, { id: accessToken, nombre: interaction.user.username})

            // await redis.hSetData('trello-access-token', interaction, { id: accessToken, nombre: interaction.user.username} ) // 

            res.send('<h1> Listo. Ya podes volver a Discord. </h1>')
            
            await interaction.editReply({ content:'¡Iniciaste sesión en Trello con éxito!', components: [], ephemeral: true});

        });
    };

    app.get('/login', function(request, response) { login(request, response); });

    app.get('/callback', function(request, response) { callback(request, response); });

    const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setLabel('Accedé a Trello')
                .setURL(`http://${host}:8080/login`)
                .setStyle(ButtonStyle.Link)
        );   
    console.log('Se crea petición a Trello. Esperando acción del usuario...')
    await interaction.reply({ content: 'Necesitamos algunos permisos. Por favor, autorizá a Mirtha a acceder a Trello', components: [row], ephemeral: true })
    .then(console.log('Respuesta existosa por parte de OAuth'));
}

export async function getToken(interaction) {

    dotenv.config();

    const trelloAccess = await redisHGetAllTrelloAccess(interaction)

    // const trelloToken = await redis.hGetAllData('trello-access-token', interaction); // 

	if (!trelloAccess) { 

        await setToken(interaction);
    
    } else {

        return `key=${process.env.TRELLO_API_KEY}&token=${trelloAccess.id}`;
    }
}