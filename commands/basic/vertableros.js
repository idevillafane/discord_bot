import { SlashCommandBuilder } from 'discord.js'
import TrelloNodeApi from 'trello-node-api';
import dotenv from 'dotenv'

dotenv.config()
const trello = new TrelloNodeApi();
trello.setApiKey(process.env.TRELLO_API_KEY);
trello.setOauthToken(process.env.TRELLO_API_TOKEN);

export default {
	data: new SlashCommandBuilder()
		.setName('vertableros')
		.setDescription('Ver todos los tableros.'),
	async execute(interaction) {
		let respuesta = await trello.member.searchBoards('me').then(function (response) {
			const nuevoArray = response.map(objeto => {
				const nuevoObjeto = {
					id: objeto.id,
					name: objeto.name,
					url: objeto.shortUrl
				};
				return nuevoObjeto;
			});
			return nuevoArray
		})
		.catch(function (error) {
			console.log('error', error);
		});
		console.log(respuesta)
		await interaction.reply("Hay " + respuesta.length + " tableros.")
	}

};