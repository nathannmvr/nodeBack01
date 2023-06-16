import fs from 'node:fs/promises';

const databasePath = new URL('../db.json',import.meta.url);

export class Database {
    #database = {};

    constructor(){
        fs.readFile(databasePath,'utf8')
        .then(data => {
            this.#database = JSON.parse(data);
        }).catch(() => {
            this.#persist();
        })
    }

    #persist(){
        fs.writeFile(databasePath,JSON.stringify(this.#database));
    }

    select(table){
        const data = this.#database[table] ?? [];
        return data;
    }

    insert(table, data){
        if(Array.isArray(this.#database[table])){
            this.#database[table].push(data);
        } else {
            this.#database[table] = [data];
        }
        this.#persist();
    }

    update(table, id, data) {
        const index = this.#database[table].findIndex(item => item.id === id);
        this.#database[table][index] = {...this.#database[table][index], ...data};
        this.#persist();
    }

    delete(table, id) {
        const remove = this.#database[table].filter(item => item.id != id);
        this.#database[table] = remove;
        this.#persist();
    }
}