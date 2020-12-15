"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prefix = void 0;
const discord_js_1 = require("discord.js");
const imports_1 = require("../../imports");
class prefix extends imports_1.Command {
    async action(message, prefix) {
        if (!prefix || prefix.length > 1)
            return;
        var client = message.client;
        await client.dbGuilds.set(message.guild.id, "prefix", `'${prefix}'`);
        var embed = new discord_js_1.MessageEmbed();
        embed.setTitle("Prefix");
        embed.setDescription(`This server's prefix is now \`${prefix}\``);
        message.channel.send(embed);
    }
}
exports.prefix = prefix;
