"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mod = void 0;
const imports_1 = require("../imports");
class mod extends imports_1.Group {
    get name() { return "Moderator"; }
    get order() { return 3; }
    valid(msg) {
        return msg.member.hasPermission("MANAGE_GUILD")
            || msg.member.roles.cache.some(v => ["moderator", "mod"].includes(v.name.toLowerCase()));
    }
}
exports.mod = mod;
