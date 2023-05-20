import { ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } from 'discord.js';
import { getTrelloToken } from "./getTrelloToken.js";
import { setRedisData } from "./setRedisData.js";
import { setTrelloToken } from "./setTrelloToken.js";

export async function setTablero(interaction) {

    const trelloToken = await getTrelloToken(interaction);

    if (!trelloToken) {

        await setTrelloToken(interaction);

    } else {
        
        const trelloData = await fetch(`https://api.trello.com/1/members/me/boards?fields=id,name&${trelloToken}`)
            .then(async res => { if (!res.ok) { throw new Error("Hubo un problema al solicitar los tableros") } return await res.json() })
            .then(data => data.map(obj => new StringSelectMenuOptionBuilder().setLabel(obj.name).setValue(obj.id)));

        const row = new ActionRowBuilder().addComponents(new StringSelectMenuBuilder().setCustomId('tablero').setPlaceholder(`Elegí un tablero.`).addOptions(trelloData));
        
        const response = await interaction.reply({ content: `Tenés ${trelloData.length} tableros. Elegí con cuál querés trabajar.`, components: [row], ephemeral: true });
        
        try {

            const confirmation = await response.awaitMessageComponent({ filter: i => i.user.id === interaction.user.id, time: 60000 });

            const tablero = {
                nombre: trelloData.find(objeto => objeto.data.value === confirmation.values[0])?.data.label,
                id: confirmation.values[0]
            }

            await setRedisData('tablero', interaction, { nombre: tablero.nombre, id: tablero.id });

            await interaction.editReply({ content: `Elegiste el tablero "${trelloData.find(objeto => objeto.data.value === confirmation.values[0])?.data.label}"`, components: [], ephemeral: true });

        } catch (e) {

            await interaction.editReply('No se recibió respuesta durante un minuto. Se canecela la petición.');

        }
    }
}