const amqp = require('amqplib');

class RabbitInit {
  static connections = new Map();

  static channels = new Map();

  static async initConnection(serviceName) {
    if (this.connections.has(serviceName)) {
      return this.connections.get(serviceName);
    }
    const connection = await amqp.connect('amqp://localhost');
    this.connections.set(serviceName, connection);
    return connection;
  }

  static async initChannel(serviceName, channelName) {
    const key = `${serviceName}-${channelName}`;
    if (this.channels.has(key)) {
      return this.channels.get(key);
    }
    const connection = await RabbitInit.initConnection(serviceName);
    const channel = await connection.createChannel();
    this.channels.set(key, channel);
    return channel;
  }
}


module.exports = RabbitInit;
