var mosca = require('mosca')
var config = require('./config')

var dataStore = {
  type: 'mongo',
  url: config.databaseUrl,
  pubsubCollection: 'mqtt',
  mongo: {}
};

var dataLogger = {
    level: 'debug'
};

var settings = {
  port: config.port,
  backend: dataStore,
  logger: dataLogger
};

process.on("uncaughtException", function(error) {
  return console.log(error.stack);
});

var server = new mosca.Server(settings);
server.on('ready', setup);

// fired when the mqtt server is ready
function setup() {
  console.log('Skynet MQTT server started on port', config.port);
}

// // fired when a message is published
// server.on('published', function(packet, client) {
//   console.log('Published', packet);
//   console.log('Client', client);
// });
// // fired when a client connects or disconnects
// server.on('clientConnected', function(client) {
//   console.log('Client Connected:', client.id);
// });
// server.on('clientDisconnected', function(client) {
//   console.log('Client Disconnected:', client.id);
// });
