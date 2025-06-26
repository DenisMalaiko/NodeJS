import {nanoid} from 'nanoid';

export class BrewsModel {
    static scope = 'singleton';
    #store = new Map();

    constructor() {
        console.log(`BrewModel initialized`);
    }

    list() {
        console.log("MODEL list")
        return [{ name: "MODEL DATA" }]
        //return [...this.#store.values()];
    }

    find(id) {
        return this.#store.get(id) ?? null;
    }

    create(dto) {
        const id = nanoid(8);
        const user = {id, ...dto};
        this.#store.set(id, user);
        return user;
    }

    update(id, dto) {
        if (!this.#store.has(id)) return null;
        const user = {id, ...dto};
        this.#store.set(id, user);
        return user;
    }

    delete(id) {
        return this.#store.delete(id);
    }
}