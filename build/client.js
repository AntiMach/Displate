"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotClient = void 0;
const discord_js_1 = require("discord.js");
const database_1 = require("./database");
const path = require("path");
const fs = require("fs");
class BotClient extends discord_js_1.Client {
    constructor(dbConfig) {
        super();
        this.commands = new Map();
        this.alliases = new Map();
        this.groups = new Map();
        this.importAll(__dirname);
        this.database = new database_1.Database(dbConfig);
        this.dbGuilds = new database_1.Table(this.database, "guilds");
        this.on("ready", () => this.onReady());
        this.on("message", (msg) => this.onMessage(msg));
        this.on("error", console.error);
    }
    async getPrefix(guild) {
        return (await this.dbGuilds.get(guild.id)).prefix;
    }
    async getPRegex(msg) {
        return new RegExp(`^\\s*[${await this.getPrefix(msg.guild)}]\\s*`);
    }
    async onReady() {
        console.log(`Client logged in as \x1b[32m@${this.user.tag}\x1b[0m`);
    }
    async onMessage(msg) {
        var regexp = await this.getPRegex(msg);
        if (msg.author.bot || !regexp.test(msg.content))
            return;
        var args = msg.content.replace(regexp, "").match(/\S+/g);
        var commandName = args.shift().toLowerCase();
        if (!this.alliases.has(commandName))
            return;
        var command = this.alliases.get(commandName);
        if (!await command.valid(msg) || !await this.groups.get(command.group).valid(msg))
            return;
        command.action(msg, ...args);
    }
    addCommand(command) {
        if (!this.groups.has(command.group))
            throw new Error(`Invalid group reference: ${command.group}`);
        if (this.commands.has(command.ref))
            throw new Error(`Invalid command reference: ${command.ref}`);
        this.commands.set(command.ref, command);
        this.alliases.set(command.ref, command);
        if (typeof command.alliases !== "undefined")
            for (var allias of command.alliases) {
                this.alliases.set(allias, command);
            }
        this.groups.get(command.group).commands.set(command.ref, command);
    }
    addGroup(group) {
        this.groups.set(group.ref, group);
    }
    importFiles(type, action, from, root = true) {
        if (root)
            from = path.resolve(from, type);
        for (var file of fs.readdirSync(from)) {
            file = path.resolve(from, file);
            var stat = fs.statSync(file);
            if (stat.isDirectory()) {
                if (root)
                    this.importFiles(type, action, file, false);
                continue;
            }
            var sub = path.dirname(file).split(path.sep).pop();
            var data = require(file);
            for (var prop in data) {
                var ctor = data[prop];
                action(new ctor(ctor.name, sub));
            }
        }
    }
    importCommands(from) {
        this.importFiles("commands", (arg) => this.addCommand(arg), from);
    }
    importGroups(from) {
        this.importFiles("groups", (arg) => this.addGroup(arg), from);
    }
    importAll(from) {
        this.importGroups(from);
        this.importCommands(from);
    }
}
exports.BotClient = BotClient;
