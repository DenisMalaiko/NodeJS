import {nanoid} from 'nanoid';

export class BrewsModel {
    static scope = 'singleton';
    #store = new Map();

    constructor() {
        console.log(`BrewModel initialized`);
    }

    list(queryParams) {
        const method = queryParams?.method ?? null;
        const ratingMin = queryParams.ratingMin ?? null;

        const data = [...this.#store.values()];

        const result = data
            .filter(brew => method ? brew.method === method : brew.method)
            .filter(brew => ratingMin ? brew.rating >= ratingMin : brew.rating)

        return result;
    }

    find(id) {
        return this.#store.get(id) ?? null;
    }

    create(dto) {
        const id = nanoid(8);
        const brew = {id, ...dto};
        this.#store.set(id, brew);
        return brew;
    }

    update(id, dto) {
        if (!this.#store.has(id)) return null;
        const brew = {id, ...dto};
        this.#store.set(id, brew);
        return brew;
    }

    delete(id) {
        return this.#store.delete(id);
    }
}