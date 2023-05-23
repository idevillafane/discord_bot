import { discordReply } from "../../utils/discordReply.js";
import { getToken, setToken } from "../authorization/oauth.js";

 export async function postTicket(interaction, data) {

    const trelloToken = await getToken(interaction);

    if (!trelloToken) {

        await setToken(interaction);

    } else {

    fetch(`https://api.trello.com/1/cards?${trelloToken}`, {

            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)

        }).then(async res => {

            console.log(res.status)

            if (res.status === 200) {
                await discordReply(interaction, `Ya se creó la tarjeta "${data.name}" en la lista.`)
            } else if (res.status === 404) {
                await discordReply(interaction, 'Hay un problema de acceso. Por favor, autorizá a Mirtha a acceder a Trello.')
            }

        }).catch(error => console.error('Error:', error));
    }
}