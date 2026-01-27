const { Server } = require('socket.io');
const corsOption = require('./socketConfig');
let io = null;

module.exports = {
  init(server) {
    io = new Server(server, { cors: corsOption });
    return io;
  },

  getIO() {
    if (!io) {
      throw new Error('Socket.io not initialized');
    }
    return io;
  },
};
