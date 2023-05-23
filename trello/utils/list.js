import { ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } from 'discord.js';
import * as redis from '../../redis_db/redis.js';
import { getToken, setToken } from '../authorization/oauth.js';
import { getTablero } from './board.js';


export async function getLista(interaction) {

    const trelloToken = await getToken(interaction);

    if (!trelloToken) {

        await setToken(interaction);

    } else {

        const lista = await redis.redisHGetAllListaDefault(interaction)

        // const lista = await redis.hGetAllData('lista', interaction)

        if (!lista) {

            await setLista(interaction)

        } else {

            return lista;
        }
    }
}

export async function setLista(interaction) {

    const trelloToken = await getToken(interaction);

    if (trelloToken) {

        const tablero = await getTablero(interaction);

        if (tablero) {

            const trelloData = await fetch(`https://api.trello.com/1/boards/${tablero.id}/lists?list_fields=id,name&${trelloToken}`)
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
                
                await redis.redisHSetListaDefault(interaction, { nombre: lista.nombre, id: lista.id });

                await interaction.editReply({ content: `Elegiste la lista "${trelloData.find(objeto => objeto.data.value === confirmation.values[0])?.data.label}"`, components: [], ephemeral: true });

            } catch (e) {

                await interaction.editReply('No se recibió respuesta durante un minuto. Se canecela la petición.');
            }
        }
    }
}