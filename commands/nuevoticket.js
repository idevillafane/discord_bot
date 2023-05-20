import { ActionRowBuilder, Events, ModalBuilder, TextInputBuilder, TextInputStyle, SlashCommandBuilder } from 'discord.js';
import { getLista } from '../utils/getLista.js';
import { getTablero } from '../utils/getTablero.js';
import { getTrelloToken } from '../utils/getTrelloToken.js';
import { setTrelloToken } from '../utils/setTrelloToken.js';


export default {

	data: new SlashCommandBuilder()
		.setName('nuevoticket')
		.setDescription('Crea una tarjeta en una lista de un tablero'),
		/*
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
			*/

  async execute(interaction) {

		const trelloToken = await getTrelloToken(interaction);

		if (trelloToken) {

			const lista = await getLista(interaction);

			if (lista) {

				const modal = new ModalBuilder()
					.setCustomId('nuevoticket')
					.setTitle('nuevoticket')
					.addComponents(
						new ActionRowBuilder().addComponents(
							new TextInputBuilder()
							.setCustomId('titulo')
							.setLabel("Título de la tarjeta")
							.setStyle(TextInputStyle.Short)
							.setRequired(false)
						),
						new ActionRowBuilder().addComponents(
							new TextInputBuilder()
							.setCustomId('info')
							.setLabel("Descripción de la tarjeta")
							.setStyle(TextInputStyle.Paragraph)
							.setRequired(false)
						),
						new ActionRowBuilder().addComponents(
							new TextInputBuilder()
							.setCustomId('start')
							.setLabel("Fecha de inicio")
							.setPlaceholder('YYYY-mm-DD')
							.setStyle(TextInputStyle.Short)
							.setRequired(false)
						),
						new ActionRowBuilder().addComponents(
							new TextInputBuilder()
							.setCustomId('due')
							.setLabel("Fecha de vencimiento")
							.setPlaceholder('YYYY-mm-DD')
							.setStyle(TextInputStyle.Paragraph)
							.setRequired(false)
						),

					)

				await interaction.showModal(modal);

				async function procesarCampos(obj) {

					const titulo = await obj.fields.getTextInputValue('titulo');
					const info = await obj.fields.getTextInputValue('info');
					const start = await obj.fields.getTextInputValue('start');
					const due = await obj.fields.getTextInputValue('due');
				  
					const res = {
					  titulo: titulo ?? 'Valor por defecto',
					  info: info ?? 'Valor por defecto',
					  start: start ?? 'Valor por defecto',
					  due: due ?? 'Valor por defecto'
					};
				  
					return res;
				  }

				const response = await interaction.awaitModalSubmit({ time: 15_000 })
					.then(async res => await procesarCampos(res))
					.catch(console.error);


				/**
				 * Comienza armado del POST
				 */

				console.log(lista.id)
				console.log(trelloToken)
			
				const data = {
					idList: `${lista.id}`,
					name: `${response.titulo}`,
					desc: `${response.info}`,
					//due: `${response.due}`, // YYYY-mm-DD
					//start: `${response.start}`
				}
			
				fetch(`https://api.trello.com/1/cards?${trelloToken}`, {

					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(data)

				}).then(async res => {

					console.log(res.status)

					if (res.status === 200) {
						return await interaction.editReply(`Ya se creó la tarjeta "${response.titulo}" en la lista.`);
					} else if (res.status === 400) {
						return await interaction.editReply('Hay un problema de acceso. Por favor, autorizá a Mirtha a acceder a Trello.')
					}

				}).catch(error => console.error('Error:', error));

			}
		}
	}
}