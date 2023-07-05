import redis from 'redis';

const client = redis.createClient();

client.on('connect', function () {
  // console.log('Conectado a Redis');
});

client.on('end', function () {
  // console.log('Desconectado de Redis');
});

function hGetAllData(label, discordInteraction) {
  return new Promise((resolve, reject) => {
    client.hgetall(`${label}:${discordInteraction.user.id}`, function (err, redisData) {
      if (err) {
        reject(err);
      } else if (Object.keys(redisData).length < 2) {
        resolve(null);
      } else {
        resolve(redisData);
      }
    });
  });
}

function hSetData(label, discordInteraction, data) {
  return new Promise((resolve, reject) => {
    client.hset(`${label}:${discordInteraction.user.id}`, data, function (err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

export async function redisHGetAllListaDefault(discordInteraction) {
  try {
    return await hGetAllData('lista-default', discordInteraction);
  } catch (error) {
    // TODO: manejo de errores
    throw error;
  }
}

export async function redisHGetAllTableroDefault(discordInteraction) {
  try {
    return await hGetAllData('tablero-default', discordInteraction);
  } catch (error) {
    // TODO: manejo de errores
    throw error;
  }
}

export async function redisHGetAllTrelloAccess(discordInteraction) {
  try {
    return await hGetAllData('trello-access', discordInteraction);
  } catch (error) {
    // TODO: manejo de errores
    throw error;
  }
}

export async function redisHSetListaDefault(discordInteraction, data) {
  try {
    await hSetData('lista-default', discordInteraction, data);
  } catch (error) {
    // TODO: manejo de errores
    throw error;
  }
}

export async function redisHSetTableroDefault(discordInteraction, data) {
  try {
    await hSetData('tablero-default', discordInteraction, data);
  } catch (error) {
    // TODO: manejo de errores
    throw error;
  }
}

export async function redisHSetTrelloAccess(discordInteraction, data) {
  try {
    await hSetData('trello-access', discordInteraction, data);
  } catch (error) {
    // Maneja el error aquí o lánzalo para que lo manejen en otro lugar
    throw error;
  }
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
