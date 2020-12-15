import { Message, MessageEmbed } from "discord.js";
import { BotClient } from "../../client";
import { Command } from "../../imports";

export class help extends Command {
    public async action(msg: Message) {
        var client = msg.client as BotClient;
        var prefix = await client.getPrefix(msg.guild);
        
        var groups = new Map<string, string>();
        for (var group of [...client.groups.values()].sort((a, b) => b.order - a.order)) {
            if (!groups.has(group.name)) groups.set(group.name, "");

            for (var c of [...group.commands.keys()].sort((a, b) => a.localeCompare(b))) {
                groups.set(group.name, groups.get(group.name) + `\`${prefix}${c}\` `)
            }
        }

        var embed = new MessageEmbed();
        embed.setTitle("Help");
        embed.setDescription("Here's a list with all of the available commands");
        for (var [k, v] of groups) if (v) embed.addField(k, v);
        msg.channel.send(embed)
    }
}