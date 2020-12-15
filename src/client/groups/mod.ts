import { Message } from "discord.js";
import { Group } from "../imports";

export class mod extends Group {
    public get name() { return "Moderator"; }
    public get order() { return 3; }

    public valid(msg: Message) {
        return msg.member.hasPermission("MANAGE_GUILD")
            || msg.member.roles.cache.some(v => ["moderator", "mod"].includes(v.name.toLowerCase()));
    }
}