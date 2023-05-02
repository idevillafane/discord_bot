import { SlashCommandBuilder } from 'discord.js';
import TrelloNodeApi from 'trello-node-api';
import dotenv from 'dotenv';
import client from '../../redis.js';
dotenv.config();

const trello = new TrelloNodeApi;
trello.setApiKey(process.env.TRELLO_API_KEY);

export default {

  data: new SlashCommandBuilder()

    .setName('creartarjeta')
    .setDescription('Crea una tarjeta en una lista de un tablero'),

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


				/*
					PASOS PARA PODER POSTEAR UNA CARTA
					1-. Se selecciona un tablero
					2-. Con el ID del tablero se requestea a Trello para saber los IDs de las listas
					3-. Se selecciona una lista
					4-. Se llena campos: por ahora solamente NAME
					
				*/

				/*
					let data = {
						name: 'CARD_NAME',
						desc: 'Card description',
						pos: 'top',
						idList: 'LIST_ID', //REQUIRED
						due: null,
						dueComplete: false,
						idMembers: ['MEMBER_ID', 'MEMBER_ID', 'MEMBER_ID'],
						idLabels: ['LABEL_ID', 'LABEL_ID', 'LABEL_ID'],
						urlSource: 'https://example.com',
						fileSource: 'file',
						idCardSource: 'CARD_ID',
						keepFromSource: 'attachments,checklists,comments,due,labels,members,stickers'
					};
					let response;
					try {
						response = await Trello.card.create(data);
					} catch (error) {
						if (error) {
							console.log('error ', error);
						}
					}
					console.log('response', response);
				*/

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