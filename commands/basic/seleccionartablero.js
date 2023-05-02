import { ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, SlashCommandBuilder } from 'discord.js';
import TrelloNodeApi from 'trello-node-api';
import dotenv from 'dotenv';
import client from '../../redis.js';
dotenv.config();

const trello = new TrelloNodeApi;
trello.setApiKey(process.env.TRELLO_API_KEY);


export default {

  data: new SlashCommandBuilder()

    .setName('seleccionartablero')
    .setDescription('Seleccioná el tablero con el que vas a trabajar'),

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

				const select = new StringSelectMenuBuilder()
                .setCustomId('starter')
                .setPlaceholder('Make a selection!')
                .addOptions(

                    

                    /*
                    new StringSelectMenuOptionBuilder()
                        .setLabel('Bulbasaur')
                        .setDescription('The dual-type Grass/Poison Seed Pokémon.')
                        .setValue('bulbasaur'),
                    new StringSelectMenuOptionBuilder()
                        .setLabel('Charmander')
                        .setDescription('The Fire-type Lizard Pokémon.')
                        .setValue('charmander'),
                    new StringSelectMenuOptionBuilder()
                        .setLabel('Squirtle')
                        .setDescription('The Water-type Tiny Turtle Pokémon.')
                        .setValue('squirtle'),
                    */
			    );

            const row = new ActionRowBuilder().addComponents(select);

            await interaction.reply({ content: 'Choose your starter!', components: [row] });

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