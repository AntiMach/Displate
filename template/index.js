var { BotClient } = require('displate');
var ENV = require('./env.json');

const client = new BotClient(ENV.database);

client.login(ENV.token);

process.on("uncaughtException", console.error);
process.on("unhandledRejection", (err) => console.error(err));