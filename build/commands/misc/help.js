"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.help = void 0;
const discord_js_1 = require("discord.js");
const imports_1 = require("../../imports");
class help extends imports_1.Command {
    async action(msg) {
        var client = msg.client;
        var prefix = await client.getPrefix(msg.guild);
        var groups = new Map();
        for (var group of [...client.groups.values()].sort((a, b) => b.order - a.order)) {
            if (!groups.has(group.name))
                groups.set(group.name, "");
            for (var c of [...group.commands.keys()].sort((a, b) => a.localeCompare(b))) {
                groups.set(group.name, groups.get(group.name) + `\`${prefix}${c}\` `);
            }
        }
        var embed = new discord_js_1.MessageEmbed();
        embed.setTitle("Help");
        embed.setDescription("Here's a list with all of the available commands");
        for (var [k, v] of groups)
            if (v)
                embed.addField(k, v);
        msg.channel.send(embed);
    }
}
exports.help = help;
