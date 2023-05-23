import { SlashCommandBuilder } from 'discord.js';
import TrelloNodeApi from 'trello-node-api';
import dotenv from 'dotenv'
import { setToken } from '../trello/authorization/oauth.js';
dotenv.config()
const trello = new TrelloNodeApi;

export default {

	data: new SlashCommandBuilder()
		.setName('autorizar')
		.setDescription('Autorizar acceso a Trello mediante OAuth'),

	async execute(interaction) {

			await setToken(interaction);

	}

	
};
