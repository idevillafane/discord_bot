import { SlashCommandBuilder } from 'discord.js';
import { getToken } from '../trello/authorization/oauth.js';
import { setTablero } from '../trello/utils/board.js';


export default {

	data: new SlashCommandBuilder()
		.setName('seleccionartablero')
		.setDescription('Selecciona tablero de trabajo'),

  async execute(interaction) {

		const trelloToken = await getToken(interaction);

		if (trelloToken) {

			await setTablero(interaction);

		}
	}
}