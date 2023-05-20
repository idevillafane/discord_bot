import { getRedisData } from "./getRedisData.js";
import { setTablero } from "./setTablero.js";
import { getTrelloToken } from "./getTrelloToken.js";
import { setTrelloToken } from "./setTrelloToken.js";

export async function getTablero(interaction) {

    const trelloToken = await getTrelloToken(interaction);

    if (trelloToken) {

        const tablero = await getRedisData('tablero', interaction)

        if (!tablero) {

            await setTablero(interaction)

        } else {

            return tablero;

        }
    }
}