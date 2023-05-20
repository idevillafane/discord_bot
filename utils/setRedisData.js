import client from '../redis.js';

export async function setRedisData(label, discordInteraction, data) {

    await client.connect();

    try {
        await client.hSet(`${label}:${discordInteraction.user.id}`, data);
    } finally {
        await client.quit();
    }

}