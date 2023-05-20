import client from '../redis.js';

export async function getRedisData(label, discordInteraction) {

    await client.connect();

    try {

        const redisData = await client.hGetAll(`${label}:${discordInteraction.user.id}`);

        if (Object.keys(redisData) < 2) {

           // console.log('dio null')

            return null;

        } else {

            return redisData;

        }

    } finally {

        client.quit();

    }

}