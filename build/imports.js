"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Group = exports.Command = void 0;
class ReferencedImport {
    constructor(ref, subref) {
        this.ref = ref;
        this.subref = subref;
    }
}
class Command extends ReferencedImport {
    get group() { return this.subref; }
    get alliases() { return; }
    action(msg, ...args) { }
    ;
    valid(msg) { return true; }
    ;
}
exports.Command = Command;
class Group extends ReferencedImport {
    constructor(ref, subref) {
        super(ref, subref);
        this.commands = new Map();
    }
    get name() { return this.ref.charAt(0).toUpperCase() + this.ref.slice(1); }
    get order() { return 0; }
    valid(msg) { return true; }
    ;
}
exports.Group = Group;
