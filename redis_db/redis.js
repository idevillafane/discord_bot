import redis from 'redis';

const client = redis.createClient();

client.on('connect', function() {
  //console.log('Conectado a Redis');
});

client.on('end', function() {
  //console.log('Desconectado de Redis')
});

function hGetAllData(label, discordInteraction) {
  return new Promise((resolve, reject) => {
    client.hGetAll(`${label}:${discordInteraction.user.id}`, function (err, redisData) {
      if (err) {
        reject(err);
      } else {
        resolve(redisData);
      }
    });
  });
}

function hSetData(label, discordInteraction, data) {
  return new Promise((resolve, reject) => {
    client.hSet(`${label}:${discordInteraction.user.id}`, data, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

export function redisHGetAllListaDefault(discordInteraction) {
  return hGetAllData('lista-default', discordInteraction);
}

export function redisHGetAllTableroDefault(discordInteraction) {
  return hGetAllData('tablero-default', discordInteraction);
}

export function redisHGetAllTrelloAccess(discordInteraction) {
  return hGetAllData('trello-access', discordInteraction);
}

export function redisHSetListaDefault(discordInteraction, data) {
  return hSetData('lista-default', discordInteraction, data);
}

export function redisHSetTableroDefault(discordInteraction, data) {
  return hSetData('tablero-default', discordInteraction, data);
}

export function redisHSetTrelloAccess(discordInteraction, data) {
  return hSetData('trello-access', discordInteraction, data);
}


/*

client.on('connect', function() {
  //console.log('Conectado a Redis');
});

client.on('end', function() {
  //console.log('Desconectado de Redis')
})

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

*/
