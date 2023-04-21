import { SlashCommandBuilder } from 'discord.js'

export default {
	data: new SlashCommandBuilder()
		.setName('usuario')
		.setDescription('Información del usuario.'),
	async execute(interaction) {
		// interaction.user is the object representing the User who ran the command
		// interaction.member is the GuildMember object, which represents the user in the specific guild
		await interaction.reply(`Este comando fue ejecutado por ${interaction.user.username}, miembro desde ${interaction.member.joinedAt}.`);
	},
};