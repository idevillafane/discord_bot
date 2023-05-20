import redis from 'redis'

const client = redis.createClient();

client.on('connect', function() {
  //console.log('Conectado a Redis');
});

client.on('end', function() {
  //console.log('Desconectado de Redis')
})

export default client;
