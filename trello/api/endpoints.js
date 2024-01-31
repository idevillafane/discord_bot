import { getToken } from "../authorization/oauth.js"

const __baseURL = 'https://api.trello.com/1/'

/**
 * ESTA CLASE ES LA INTERFAZ POR MEDIO DE LA CUAL SE ESTABLECEN LAS CONEXIONES DESDE DISCORD HACIA TRELLO.
 * DESCRIPCIÓN DE LAS FUNCIONES:
 * - oauthGET():
 * - oauthPOST():
 * - getBoards(): Trae a Discord todos los tableros del usuario que hace la petición.
 * - getLists(): Trae a Discord todas las listas de un tablero determinado.
 * - getMembersOfABoard(): Trae a Discord todos los miembros de un tablero determinado.
 * - postCardToListOnABoard(): Envia una tarjeta con contenido a una lista determinada (en un tablero determinado). 
 *  */


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