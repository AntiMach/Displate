import { Message } from "discord.js";

class ReferencedImport {
    public readonly ref: string;
    public readonly subref: string;

    constructor(ref: string, subref: string) {
        this.ref = ref;
        this.subref = subref;
    }
}

export class Command extends ReferencedImport {
    public get group(): string { return this.subref; }
    public get alliases(): string[] { return; }

    public action(msg: Message, ...args: string[]): void | Promise<void> {};
    public valid(msg: Message): boolean | Promise<boolean> { return true; };
}

export class Group extends ReferencedImport {
    public readonly commands: Map<string, Command>;

    constructor(ref: string, subref: string) {
        super(ref, subref);
        this.commands = new Map();
    }

    public get name(): string { return this.ref.charAt(0).toUpperCase() + this.ref.slice(1) }
    public get order(): number { return 0; }

    public valid(msg: Message): boolean | Promise<boolean> { return true; };
}