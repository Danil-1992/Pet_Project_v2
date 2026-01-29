const { createClient } = require('redis');

const client = createClient({
  url: 'redis://localhost:6379'
});

client.on('error', (err) => console.log('Redis Client Error', err));

let isConnected = false;

module.exports = {
  connect: async () => {
    if (!isConnected) {
      await client.connect();
      isConnected = true;
    }
    return client;
  },
  
  getClient: () => {
    if (!isConnected) throw new Error('Redis not connected');
    return client;
  },
  
  disconnect: async () => {
    if (isConnected) {
      await client.quit();
      isConnected = false;
    }
  }
};