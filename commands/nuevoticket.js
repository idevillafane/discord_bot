import { ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ButtonBuilder, ButtonStyle, ModalBuilder, TextInputBuilder, TextInputStyle, SlashCommandBuilder } from 'discord.js';
import { getLista } from '../trello/utils/list.js';
import { getToken } from '../trello/authorization/oauth.js';
import { postTicket } from '../trello/utils/card.js';
import { discordReply } from '../utils/discordReply.js';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat.js'
import { getMembersOfABoard, postCardToListOnABoard } from '../trello/api/endpoints.js';
dayjs.extend(customParseFormat)

export default {

	data: new SlashCommandBuilder()
		.setName('nuevoticket')
		.setDescription('Crea una tarjeta en una lista de un tablero'),

  async execute(interaction) {

		const trelloToken = await getToken(interaction);

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
							.setRequired(true)
							.setPlaceholder('Escribí un título para tu tarjeta')
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
							.setStyle(TextInputStyle.Short)
							.setRequired(false)
							.setPlaceholder('Ej.: 15/03/2023')
						),
						new ActionRowBuilder().addComponents(
							new TextInputBuilder()
							.setCustomId('due')
							.setLabel("Fecha de finalización")
							.setStyle(TextInputStyle.Short)
							.setRequired(false)
							.setPlaceholder('Ej.: 21/09/2024')
							.setMinLength(8)
							.setMaxLength(10)
						),
					);

				await interaction.showModal(modal);

				const validFormats = [
					'DD-MM-YYYY', 'D-M-YYYY', 'DD-M-YYYY', 'D-MM-YYYY', 
					'DD/MM/YYYY', 'D/M/YYYY', 'DD/M/YYYY', 'D/MM/YYYY',
					'DD-MM-YY', 'D-M-YY', 'DD-M-YY', 'D-MM-YY',
					'DD/MM/YY', 'D/M/YY', 'DD/M/YY', 'D/MM/YY'];

				async function procesarCampos(obj) {

					const titulo = await obj.fields.getTextInputValue('titulo');
					const info = await obj.fields.getTextInputValue('info');
					const start = await obj.fields.getTextInputValue('start');
					const due = await obj.fields.getTextInputValue('due');
				  
					const res = { queryParams: {} };

					res.queryParams.idList = lista.id;
					res.queryParams.name = titulo ?? 'Ticket sin título creado desde Discord';
					res.queryParams.desc = info;

					if (start) {


						if (dayjs(start, validFormats, 'es', true).isValid()) {

							res.queryParams.start = dayjs(start, validFormats, 'es').format('YYYY-MM-DD');

						} else {

							res.invalidStart = true;
						}
					}

					if (due) {

						if (dayjs(due, validFormats, 'es', true).isValid() & (dayjs(start) < dayjs(due))) {

							res.queryParams.due = dayjs(due, validFormats, 'es').format('YYYY-MM-DD');

						} else {

							res.invalidDue = true;
						}
					}
 
					return res;
				  }

				const response = await interaction.awaitModalSubmit({ time: 120_000 })
				  .then(async res => await procesarCampos(res))
				  .catch(console.error);
				
				/**
				 * 
				 * AÑADIR MIEMBROS
				 * 
				 */

				const no = new ButtonBuilder()
				  .setCustomId('no')
				  .setLabel('NO')
				  .setStyle(ButtonStyle.Danger);
	  
			  	const si = new ButtonBuilder()
				  .setCustomId('si')
				  .setLabel('SÍ')
				  .setStyle(ButtonStyle.Success);


				const confirmacion = new ActionRowBuilder().addComponents(si, no);

				const memberSelection = await discordReply(interaction, '¿Querés etiquetar a otras personas en el ticket?', [confirmacion]);

				const collectorFilter = i => i.user.id === interaction.user.id;

				try {

					const memberSelectionConfirm = await memberSelection.awaitMessageComponent({ time: 120_000 });

					if (memberSelectionConfirm.customId === 'si') {

						const temporalTableroID = '6283ceed2a7287334c79dcff' // Es el ID del tablero 'Grupo 7 PI' 6283ceed2a7287334c79dcff

						const trelloData = await getMembersOfABoard(interaction, temporalTableroID)
							.then(data => data.map(obj => new StringSelectMenuOptionBuilder().setLabel(obj.fullName).setValue(obj.id)));
					
						const row = new ActionRowBuilder().addComponents(new StringSelectMenuBuilder().setCustomId('miembros').setPlaceholder(`Elegí a que miembros etiquetar.`).setMinValues(0).setMaxValues(trelloData.length).addOptions(trelloData));

						const listaDeMiembros = await memberSelectionConfirm.update({ content: `Hay ${trelloData.length} miembros. Elegí a quiénes querés etiquetar.`, components: [row], ephemeral: true });

						const confirmation = await listaDeMiembros.awaitMessageComponent({ filter: i => i.user.id === interaction.user.id, time: 60000 });
								
						response.queryParams.idMembers = confirmation.values?.join(',');

						await confirmation.update({ content: 'Listorti', components: [], ephemeral: true})

						await postCardToListOnABoard(interaction, response.queryParams);



					} else if (memberSelectionConfirm.customId === 'no') {

						await postCardToListOnABoard(interaction, response.queryParams);

						await memberSelectionConfirm.update({ content: 'Action cancelled', components: [] });

					}
				} catch (e) {

					await interaction.editReply({ content: 'Confirmation not received within 1 minute, cancelling', components: [] });

				} 
				
			}
		}
	}
}