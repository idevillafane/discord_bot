import { SlashCommandBuilder } from 'discord.js'

export default {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Información sobre el servidor.'),
	async execute(interaction) {
		// interaction.guild is the object representing the Guild in which the command was run
		await interaction.reply(`Este es el servidor ${interaction.guild.name} y tiene ${interaction.guild.memberCount} miembros.`);
	},
};