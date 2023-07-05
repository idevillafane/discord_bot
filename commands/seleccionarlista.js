import { SlashCommandBuilder } from 'discord.js';
import { getToken } from '../trello/authorization/oauth.js';
import { setLista } from '../trello/utils/list.js';


export default {

	data: new SlashCommandBuilder()
		.setName('seleccionarlista')
		.setDescription('Selecciona lista de trabajo'),

  async execute(interaction) {

		const trelloToken = await getToken(interaction);

		if (trelloToken) {

			await setLista(interaction);

		}
	}
}