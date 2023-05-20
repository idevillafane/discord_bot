import { ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, SlashCommandBuilder } from 'discord.js';
import TrelloNodeApi from 'trello-node-api';
import client from '../redis.js';
import fetch from 'node-fetch'
import dotenv from 'dotenv';

dotenv.config();
let trello = new TrelloNodeApi();

trello.setApiKey(process.env.TRELLO_API_KEY);

export default {

  data: new SlashCommandBuilder()

    .setName('trello')
    .setDescription('Ver todos los tableros.')
			.addStringOption(option =>
				option
					.setName('ver')
					.setDescription('The gif category')
					.setRequired(true)
					.addChoices(
						{ name: 'tablero', value: 'board' },
						{ name: 'lista', value: 'list' },
						{ name: 'info', value: 'info'}
					)),
			
  async execute(interaction) {

	await client.connect()

	const trelloAccessToken = await client.get(`trello-access-token:${interaction.user.id}`);

	const lista = await client.get(`selected-list:${interaction.user.id}`)

	await client.quit();

	if (!trelloAccessToken) {
		
		return interaction.reply('No inciaste sesión en Trello. Usá el comando /autorizar .');
	}

	const option = interaction.options.getString('ver');

	/*
		COMANDO 'INFO'
	*/


	if (option === 'info') {

		await client.connect();

		const tablero = await client.get(`selected-board:${interaction.user.id}`)

		await client.quit();

		if (tablero && lista) {	

		return interaction.reply(`Estás en el tablero ${tablero} y la lista ${lista}.`);

		} else if (tablero && !lista) {

		return interaction.reply(`Estás en el tablero ${tablero} pero aún no seleccionaste ninguna lista`);

		} else if (!tablero && lista) {

		return interaction.reply(`TODO: Esto no deberia pasar nunca.`);
		}
	}

	/*
		LÓGICA DE OPCIÓN POR COMANDOS
	*/
	
	const translateOption = {
		board: 'tablero',
		list: 'lista'
		}[option];

	await client.connect()

	const selectedBoard = option !== 'tablero' ? await client.get(`selected-board:${interaction.user.id}`) : null;

	await client.quit();

	if (selectedBoard === null && option === 'list') { return interaction.reply('Primero tenés que elegir un tablero.') }
	
	const oauthParams = `key=${process.env.TRELLO_API_KEY}&token=${trelloAccessToken}`;

	const customUrl = option === 'board' ? 'members/me?fields=id,name&boards=all' : `boards/${selectedBoard}/lists`;

	console.log(customUrl)

	const trelloData = await fetch(`https://api.trello.com/1/${customUrl}&${oauthParams}`)
		.then(async res => { if (!res.ok) { throw new Error("¡Error absolutamente inesperado!") } return await res.json() })
		.then(data => data.map(obj => new StringSelectMenuOptionBuilder().setLabel(obj.name).setValue(obj.id)));

	const row = new ActionRowBuilder().addComponents(new StringSelectMenuBuilder().setCustomId(`${option}`).setPlaceholder(`¡Elegí ${translateOption}!`).addOptions(trelloData));

	const response = await interaction.reply({ content: `Tenés ${trelloData.length} ${translateOption}s. Elegí con cuál querés trabajar.`, components: [row], ephemeral: true });
	
	try {

		const confirmation = await response.awaitMessageComponent({ filter: i => i.user.id === interaction.user.id, time: 60000 });

		await client.connect();

		await client.set(`selected-${option}:${interaction.user.id}`, confirmation.values[0]);
		
		await client.quit(); // En confirmation.values[0] está el ID del tablero

		await interaction.editReply({ content: `Elegiste ${translateOption} "${trelloData.filter(i => i.data.value == confirmation.values[0])[0].data.label}"`, components: [], ephemeral: true });

	} catch (e) {

		await interaction.editReply({ content: 'No se recibió respuesta durante un minuto. Se canecela la petición.', components: [] });
	}
  },
};