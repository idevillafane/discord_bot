import { getToken } from "../authorization/oauth.js"

const __baseURL = 'https://api.trello.com/1/'




async function oauthGET(discordInteraction, url) {

    const trelloAccessToken = await getToken(discordInteraction);

    return await fetch(__baseURL + url + trelloAccessToken);

}

async function oauthPOST(discordInteraction, url, data) {

    const trelloAccessToken = await getToken(discordInteraction);

    return await fetch(__baseURL + url + trelloAccessToken, {

            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)

        })
}

export async function getBoards(discordInteraction) {

    url = `members/me/boards?fields=id,name&`;

    return oauthGET(discordInteraction, url)
        .then(async res => { if (!res.ok) { throw new Error("Hubo un problema al solicitar los tableros") } return await res.json() })
        .then(data => data.map(obj => new StringSelectMenuOptionBuilder().setLabel(obj.name).setValue(obj.id)));
}

export async function getLists(discordInteraction, tablero){

    const url = `boards/${tablero}/lists?fields=id,name&`;

    return oauthGET(discordInteraction, url)
        .then(async res => { if (!res.ok) { throw new Error("Hubo un problema al solicitar las listas") } return await res.json() })
        .then(data => data.map(obj => new StringSelectMenuOptionBuilder().setLabel(obj.name).setValue(obj.id)));

}

export async function getMembersOfABoard(discordInteraction, tablero) {

    const url = `boards/${tablero}/members?`;

    return await oauthGET(discordInteraction, url).then(async res => { if (!res.ok) { throw new Error("Hubo un problema al solicitar los miembros del tablero") } return await res.json() })

}

export async function postCardToListOnABoard(discordInteraction, data) {

    const url = 'cards?';

    return await oauthPOST(discordInteraction, url, data).then(async res => { if (!res.ok) { throw new Error("Hubo un problema al solicitar los miembros del tablero") } return await res.json() })

}