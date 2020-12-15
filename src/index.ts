import { BotClient } from "./client/client";
import * as ENV from "./env.json";

const client = new BotClient(ENV.database);

client.login(ENV.token);

process.on("uncaughtException", console.error);
process.on("unhandledRejection", (err) => console.error(err));