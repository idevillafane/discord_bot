import redis from 'redis'

const client = redis.createClient();

client.on('connect', function() {
  console.log('Conectado a Redis');
});

export default client;