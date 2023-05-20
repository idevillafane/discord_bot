import { SlashCommandBuilder } from 'discord.js';
import TrelloNodeApi from 'trello-node-api';
import dotenv from 'dotenv';
import client from '../redis.js';
dotenv.config();

const trello = new TrelloNodeApi;
trello.setApiKey(process.env.TRELLO_API_KEY);

export default {

  data: new SlashCommandBuilder()

    .setName('creartarjeta')
    .setDescription('Crea una tarjeta en una lista de un tablero')
	.addStringOption(option =>
		option.setName('título')
			.setDescription('Título de tu tarjeta')
			.setRequired(true))
	.addStringOption(option =>
		option.setName('descripción')
			.setDescription('Descripción de la tarjeta'))
	.addStringOption(option =>
		option.setName('inicio')
		.setDescription('Fecha de inicio para la tarjeta (YYYY-mm-DD)'))
	.addStringOption(option =>
			option.setName('vencimiento')
			.setDescription('Fecha de cierre para la tarjeta (YYYY-mm-DD)')),

  async execute(interaction) {

	await client.connect()

	const trelloAccessToken = await client.get(`trello-access-token:${interaction.user.id}`);

	if (!trelloAccessToken) return interaction.reply('No inciaste sesión en Trello. Usá el comando /autorizar .')

	const trelloListId = await client.get(`selected-list:${interaction.user.id}`);

	if (!trelloListId) return interaction.reply('Primero tenés que seleccionar la lista en donde vas a crear tu tarjeta')

	await client.quit();

	const oauthParams = `key=${process.env.TRELLO_API_KEY}&token=${trelloAccessToken}`;

	const urlString = `https://api.trello.com/1/cards?${oauthParams}`;

	console.log(`URL: ${urlString}`)

	const nameData = interaction.options.getString('título') ?? 'Tarjeta creada por Mirtha';
	const descData = interaction.options.getString('descripción') ?? 'Sin descripción';
	const dueData = interaction.options.getString('inicio');
	const startData = interaction.options.getString('vencimiento');

	const data = {
		idList: `${trelloListId}`,
		name: `${nameData}`,
		desc: `${descData}`,
		due: `${dueData}`, // YYYY-mm-DD
		start: `${startData}`
	}

	// Response: ${res.status} : ${res.statusText} // idList=${trelloListId}&

	fetch(urlString, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
		.then(async res => {
				console.log(res.status)
				if (res.status === 200) {
					return await interaction.reply(`Ya se creó la tarjeta "${nameData}" en la lista.`);
				} else if (res.status === 400) {
					return await interaction.reply('Hay un problema de acceso. Por favor, autorizá a Mirtha a acceder a Trello.')
				}
			})
			.catch(error => console.error('Error:', error));
  },
};