import { ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } from 'discord.js';
import { getTablero } from "./getTablero.js";
import { setTablero } from "./setTablero.js";
import { getTrelloToken } from "./getTrelloToken.js";
import { setTrelloToken } from "./setTrelloToken.js";
import { setRedisData } from './setRedisData.js';


export async function setLista(interaction) {

    const trelloToken = await getTrelloToken(interaction);

    if (trelloToken) {

        const tablero = await getTablero(interaction);

        if (tablero) {

            const trelloData = await fetch(`https://api.trello.com/1/boards/${tablero.id}/lists?fields=id,name&${trelloToken}`)
                .then(async res => { if (!res.ok) { throw new Error("Hubo un problema al solicitar las listas") } return await res.json() })
                .then(data => data.map(obj => new StringSelectMenuOptionBuilder().setLabel(obj.name).setValue(obj.id)));

            const row = new ActionRowBuilder().addComponents(new StringSelectMenuBuilder().setCustomId('lista').setPlaceholder(`Elegí una lista.`).addOptions(trelloData));

            const response = await interaction.reply({ content: `Tenés ${trelloData.length} listas. Elegí con cuál querés trabajar.`, components: [row], ephemeral: true });
            
            try {

                const confirmation = await response.awaitMessageComponent({ filter: i => i.user.id === interaction.user.id, time: 60000 });

                const lista = {
                    nombre: trelloData.find(objeto => objeto.data.value === confirmation.values[0])?.data.label,
                    id: confirmation.values[0]
                }
    
                await setRedisData('lista', interaction, { nombre: lista.nombre, id: lista.id });

                await interaction.editReply({ content: `Elegiste la lista "${trelloData.find(objeto => objeto.data.value === confirmation.values[0])?.data.label}"`, components: [], ephemeral: true });

            } catch (e) {

                await interaction.editReply('No se recibió respuesta durante un minuto. Se canecela la petición.');

            }
        }
    }
}