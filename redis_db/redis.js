import { createClient } from 'redis';

// Configuración para la base de datos local de Redis (localhost:6379)
const client = createClient({
  host: 'localhost', // Cambia a la dirección IP o nombre de host de tu servidor si no estás ejecutando Redis localmente.
  port: 6379,
});

client.on('error', err => console.log('Redis Client Error', err));

// Función para realizar operaciones de conjunto de datos en Redis
async function hSetData(label, discordInteraction, data) {
  try {
    await client.hset(`${label}:${discordInteraction.user.id}`, data);
  } catch (error) {
    console.error('Error al establecer el valor en Redis. ¿Está la instancia de Redis levantada?', error);
  }
}

// Función para obtener todos los datos asociados a una clave en Redis
async function hGetAllData(label, discordInteraction) {
  try {
    const redisData = await client.hgetall(`${label}:${discordInteraction.user.id}`);
    if (Object.keys(redisData).length < 2) {
      return null;
    } else {
      return redisData;
    }
  } catch (error) {
    console.error('Error al obtener los datos de Redis:', error);
    return null;
  }
}

// Funciones específicas para casos de uso
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
  await hSetData('lista-default', discordInteraction, data);
}

export async function redisHSetTableroDefault(discordInteraction, data) {
  await hSetData('tablero-default', discordInteraction, data);
}

export async function redisHSetTrelloAccess(discordInteraction, data) {
  await hSetData('trello-access', discordInteraction, data);
}