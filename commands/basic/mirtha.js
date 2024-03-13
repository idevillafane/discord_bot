import { SlashCommandBuilder } from 'discord.js'

export default {
	data: new SlashCommandBuilder()
		.setName('mirtha')
		.setDescription('Te dice lo que te diría la chiqui'),
	async execute(interaction) {
		await interaction.reply('Como te ven te tratan.');
	},
};