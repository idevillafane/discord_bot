import { ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, SlashCommandBuilder } from 'discord.js';
import TrelloNodeApi from 'trello-node-api';
import dotenv from 'dotenv';
import client from '../../redis.js';
import http from 'http';
dotenv.config();

const trello = new TrelloNodeApi;

trello.setApiKey(process.env.TRELLO_API_KEY);

export default {

  data: new SlashCommandBuilder()

    .setName('vertableros')
    .setDescription('Ver todos los tableros.'),


  async execute(interaction) {

	let listas;

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

				const res = await trello.member.searchBoards('me');

				const tableros = res.map(obj => ( new StringSelectMenuOptionBuilder()
					.setLabel(obj.name)
					.setValue(obj.id)))

				const select = new StringSelectMenuBuilder()
					.setCustomId('listadetableros')
					.setPlaceholder('¡Elegí un tablero!')
					.addOptions(tableros);

				const row = new ActionRowBuilder().addComponents(select);

				const response = await interaction.reply({
					content: `Tenés ${tableros.length} tableros en Trello. Elegí con cuál querés trabajar.`,
					components: [row]
				});

				const collectorFilter = i => i.user.id === interaction.user.id;

				

				try {

					const confirmation = await response.awaitMessageComponent({ filter: collectorFilter, time: 60000 });

					const verification = await confirmation.update({ content: `Elegiste el tablero con id: ${confirmation.values[0]}`, components: [] })

					const hn = `https://api.trello.com/1/boards/${confirmation.values[0]}/lists?key=${process.env.TRELLO_API_KEY}&token=${oauthToken}`;

				} catch (e) {
					await response.update({ content: 'Confirmation not received within 1 minute, cancelling', components: [] });
				}

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