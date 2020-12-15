"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Table = exports.Database = void 0;
const mysql_1 = require("mysql");
class Database {
    constructor(config) {
        this.config = config;
        this.pool = mysql_1.createPool(this.config);
    }
    async close() {
        return new Promise((resolve, reject) => {
            this.pool.end((err) => {
                if (err)
                    reject(err);
                resolve();
            });
        });
    }
    async query(query) {
        return new Promise((resolve, reject) => {
            this.pool.query(query, (err, result) => {
                if (err)
                    reject(err);
                resolve(result);
            });
        });
    }
    async create(table, eid) {
        return this.query(`INSERT INTO ${table} (ID) VALUES (${eid})`);
    }
    async set(table, eid, column, value) {
        try {
            await this.create(table, eid);
        }
        catch { }
        ;
        return this.query(`UPDATE ${table} SET ${column}=${value} WHERE ID='${eid}'`);
    }
    async get(table, eid) {
        try {
            await this.create(table, eid);
        }
        catch { }
        ;
        return (await this.query(`SELECT * FROM ${table} WHERE ID='${eid}'`))[0];
    }
}
exports.Database = Database;
class Table {
    constructor(database, name) {
        this.database = database;
        this.name = name;
        this.cache = new Map();
    }
    async update(eid) {
        this.cache.set(eid, await this.database.get(this.name, eid));
    }
    async set(eid, column, value) {
        try {
            await this.database.set(this.name, eid, column, value);
            await this.update(eid);
        }
        catch (e) {
            console.error(e);
        }
    }
    async get(eid) {
        if (!this.cache.has(eid))
            await this.update(eid);
        return this.cache.get(eid);
    }
    async add(eid, column, value) {
        this.set(eid, column, await this.get(eid)[column] + value);
    }
}
exports.Table = Table;
