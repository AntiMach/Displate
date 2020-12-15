import { Message, MessageEmbed } from "discord.js";
import { BotClient } from "../../client";
import { Command } from "../../imports";

export class prefix extends Command {
    public async action(message: Message, prefix: string) {
        if (!prefix || prefix.length > 1) return;
        var client = message.client as BotClient;
        await client.dbGuilds.set(message.guild.id, "prefix", `'${prefix}'`);

        var embed = new MessageEmbed();
        embed.setTitle("Prefix");
        embed.setDescription(`This server's prefix is now \`${prefix}\``);
        message.channel.send(embed);
    }
}