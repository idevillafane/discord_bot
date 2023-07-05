import { createClient } from 'redis'

const client = createClient();

client.on('error', err => console.log('Redis Client Error', err));

await client.connect();

/*

client.on('connect', function() {
  //console.log('Conectado a Redis');
});

client.on('end', function() {
  //console.log('Desconectado de Redis')
})

*/

async function hSetData(label, discordInteraction, data) {

  await client.hSet(`${label}:${discordInteraction.user.id}`, data);

}

async function hGetAllData(label, discordInteraction) {

  const redisData = await client.hGetAll(`${label}:${discordInteraction.user.id}`);

      if (Object.keys(redisData) < 2) {

         // console.log('dio null')

          return null;

      } else {

          return redisData;

      }

}



/*

async function hGetAllData(label, discordInteraction) {

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

async function hSetData(label, discordInteraction, data) {

  await client.connect();

  try {
      await client.hSet(`${label}:${discordInteraction.user.id}`, data);
  } finally {
      await client.quit();
  }

}

*/


export async function redisHGetAllListaDefault(discordInteraction) {

  return await hGetAllData('lista-default', discordInteraction);

}

export async function redisHGetAllTableroDefault(discordInteraction) {

  return await hGetAllData('tablero-default', discordInteraction);

}

export async function redisHGetAllTrelloAccess(discordInteraction) {

  return await hGetAllData('trello-access', discordInteraction);

}

export async function redisHSetListaDefault(discordInteraction, data) {

  await hSetData('lista-default', discordInteraction, data)

}

export async function redisHSetTableroDefault(discordInteraction, data) {

  await hSetData('tablero-default', discordInteraction, data)

}

export async function redisHSetTrelloAccess(discordInteraction, data) {

  await hSetData('trello-access', discordInteraction, data)

}

// export default client;