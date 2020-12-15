import { createPool, PoolConfig, Pool } from "mysql";

export class Database {
    public readonly config: PoolConfig;
    private pool: Pool;

    constructor(config: PoolConfig) {
        this.config = config;
        this.pool = createPool(this.config);
    }

    public async close() {
        return new Promise<void>((resolve, reject) => {
            this.pool.end((err) => {
                if (err) reject(err);
                resolve();
            })
        })
    }
    private async query(query: string) {
        return new Promise<any>((resolve, reject) => {
            this.pool.query(query, (err, result) => {
                if (err) reject(err);
                resolve(result);
            })
        })
    }

    public async create(table: string, eid: string) {
        return this.query(`INSERT INTO ${table} (ID) VALUES (${eid})`)
    }
    public async set(table: string, eid: string, column: string, value: string) {
        try { await this.create(table, eid); } catch { };

        return this.query(`UPDATE ${table} SET ${column}=${value} WHERE ID='${eid}'`);
    }
    public async get(table: string, eid: string) {
        try { await this.create(table, eid); } catch { };

        return (await this.query(`SELECT * FROM ${table} WHERE ID='${eid}'`))[0];
    }
}

export class Table<E> {
    private database: Database;
    private cache: Map<string, {ID: string} & E>;
    public readonly name: string;

    constructor(database: Database, name: string) {
        this.database = database;
        this.name = name;
        this.cache = new Map();
    }

    public async set(eid: string, column: string, value: string) {
        try {
            await this.database.set(this.name, eid, column, value);
            this.cache.get(eid)[column] = value;
        } catch (e) {
            console.error(e);
        }
    }
    public async get(eid: string) {
        if (!this.cache.has(eid))
            this.cache.set(eid, await this.database.get(this.name, eid));

        return this.cache.get(eid);
    }
    public async add(eid: string, column: string, value: number) {
        this.set(eid, column, await this.get(eid)[column] + value)
    }
}