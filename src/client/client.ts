import { Client, Guild, Message } from "discord.js";
import * as path from "path";
import * as fs from "fs";
import { Command, Group } from "./imports";
import { PoolConfig } from "mysql";
import { Database, Table } from "./database";

export class BotClient extends Client {
    public readonly commands: Map<string, Command>;
    public readonly alliases: Map<string, Command>;
    public readonly groups: Map<string, Group>;
    public readonly database: Database;
    public readonly dbGuilds: Table<{prefix: string}>; 

    constructor(dbConfig: PoolConfig) {
        super();

        this.commands = new Map();
        this.alliases = new Map();
        this.groups = new Map();
        this.importAll(__dirname);

        this.database = new Database(dbConfig);
        this.dbGuilds = new Table(this.database, "guilds");

        this.on("ready", () => this.onReady());
        this.on("message", (msg) => this.onMessage(msg));
    }

    public async getPrefix(guild: Guild) {
        return (await this.dbGuilds.get(guild.id)).prefix;
    }
    private async getPRegex(msg: Message) {
        return new RegExp(`^\\s*[${await this.getPrefix(msg.guild)}]\\s*`);
    }

    private async onReady() {
        console.log(`Client logged in as \x1b[32m@${this.user.tag}\x1b[0m`);
    }
    private async onMessage(msg: Message) {
        var regexp = await this.getPRegex(msg);
        if (msg.author.bot || !regexp.test(msg.content)) return;

        var args = msg.content.replace(regexp, "").match(/\S+/g);
        var commandName = args.shift().toLowerCase();
        if (!this.alliases.has(commandName)) return;

        var command = this.alliases.get(commandName);
        if (!await command.valid(msg) || !await this.groups.get(command.group).valid(msg)) return;

        command.action(msg, ...args);
    }

    public addCommand(command: Command) {
        if (!this.groups.has(command.group)) throw new Error(`Invalid group reference: ${command.group}`);
        if (this.commands.has(command.ref)) throw new Error(`Invalid command reference: ${command.ref}`);

        this.commands.set(command.ref, command);
        this.alliases.set(command.ref, command);
        if (typeof command.alliases !== "undefined") for (var allias of command.alliases) {
            this.alliases.set(allias, command);
        }

        this.groups.get(command.group).commands.set(command.ref, command);
    }
    public addGroup(group: Group) {
        this.groups.set(group.ref, group);
    }

    private importFiles(type: string, action: Function, from: string, root = true) {
        if (root) from = path.resolve(from, type);
        
        for (var file of fs.readdirSync(from)) {
            file = path.resolve(from, file);
            var stat = fs.statSync(file);

            if (stat.isDirectory()) {
                if (root) this.importFiles(type, action, file, false);
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

    public importCommands(from: string) {
        this.importFiles("commands", (arg: any) => this.addCommand(arg), from);
    }
    public importGroups(from: string) {
        this.importFiles("groups", (arg: any) => this.addGroup(arg), from);
    }
    public importAll(from: string) {
        this.importGroups(from);
        this.importCommands(from);
    }
}