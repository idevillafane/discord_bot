import { getRedisData } from "./getRedisData.js";
import { setLista } from './setLista.js';
import { getTrelloToken } from "./getTrelloToken.js";
import { setTrelloToken } from "./setTrelloToken.js";


export async function getLista(interaction) {

    const trelloToken = await getTrelloToken(interaction);

    if (!trelloToken) {

        await setTrelloToken(interaction);

    } else {

        const lista = await getRedisData('lista', interaction)

        if (!lista) {

            await setLista(interaction)

        } else {

            return lista;

        }

    }

}