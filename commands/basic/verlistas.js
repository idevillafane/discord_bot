import { ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, SlashCommandBuilder } from 'discord.js';
import TrelloNodeApi from 'trello-node-api';
import dotenv from 'dotenv';
import client from '../../redis.js';
dotenv.config();

const trello = new TrelloNodeApi;

trello.setApiKey(process.env.TRELLO_API_KEY);

export default {

  data: new SlashCommandBuilder()

    .setName('verlistas')
    .setDescription('Ver todos las listas de un tablero'),


  async execute(interaction) {

	// SE GUARDA EL USER ID DE DISCORD

	const interactionUserId = interaction.user.id;

	// SE GENERA EL USER DATA ID PARA BUSCAR EN REDIS

	const userDataId = "data:" + interactionUserId;

	// TODO ANALIZAR LA LOGICA TRY CATCH

    try {

		// SE ABRE CONEXION A CLIENTE DE REDIS

		await client.connect();

    	console.log('SE COMPRUEBA SI YA EXISTE EL USER DATA ID EN LD DB DE REDIS');

      	const exists = await client.exists(userDataId);

		if (exists === 1) {

			// EL USER DATA ID YA EXISTE EN LA DB DE REDIS

			try {

				// SE SOLICITA EL ACCESS TOKEN A LA DB

				const oauthToken = await client.hGet(userDataId, 'accessToken')

				console.log('SE CONFIGURA TRELLO CON EL TOKEN ' + oauthToken)

				trello.setOauthToken(oauthToken)

				// REQUEST A TRELLO API

				const res = await trello.board.searchLists('60ef6afdfc03e17dd9bc486d');

				console.log(res)

				console.log('quedate sentado charlando')

				const respuesta = await interaction.reply('Algo para responder')

        } catch (error) {

          console.log('error', error);

        }

      } else {

        interaction.reply(
          'Mirtha no tiene autorización para acceder a tu cuenta de Trello.' +
		  'Por favor, concedele los permisos que necesita con el comando /autorizar .'
        );

      }

	  console.log('SE CIERRA CONEXION A REDIS DB');

      await client.quit();

    } catch (error) {

      console.error(error);

    }
  },
};