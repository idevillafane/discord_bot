import { getRedisData } from "./getRedisData.js";
import { setTrelloToken } from "./setTrelloToken.js";
import dotenv from 'dotenv';

export async function getTrelloToken(interaction) {

    dotenv.config();

    const trelloToken = await getRedisData('trello-access-token', interaction);

	if (!trelloToken) { 

        await setTrelloToken(interaction);
    
    } else {

        return `key=${process.env.TRELLO_API_KEY}&token=${trelloToken.id}`;

    }

}