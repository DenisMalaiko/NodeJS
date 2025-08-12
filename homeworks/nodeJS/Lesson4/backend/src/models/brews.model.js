import {nanoid} from 'nanoid';

export class BrewsModel {
    static scope = 'singleton';
    store = new Map();

    constructor() {
        console.log(`BrewModel initialized`);

        const samples = [
            {
                beans: "Ethiopia Guji",
                method: "v60",
                rating: 4.5,
                notes: "Floral, bright acidity",
                brewedAt: new Date("2025-06-29T08:30:00Z"),
            },
            {
                beans: "Colombia Huila",
                method: "aeropress",
                rating: 3,
                notes: "Sweet, caramel finish",
                brewedAt: new Date("2025-07-01T09:15:00Z"),
            },
            {
                beans: "Kenya AA",
                method: "chemex",
                rating: 2,
                notes: "Berry notes, juicy body",
                brewedAt: new Date("2025-07-05T07:50:00Z"),
            }
        ];

        for (const sample of samples) {
            const id = nanoid(8);
            this.store.set(id, { id, ...sample });
        }
    }

    list(queryParams) {
        const method = queryParams?.method ?? null;
        const ratingMin = queryParams.ratingMin ?? null;
        const data = [...this.store.values()];

        const result = data
            .filter(brew => method ? brew.method === method : brew.method)
            .filter(brew => ratingMin ? brew.rating >= Number(ratingMin) : brew.rating)

        return result;
    }

    find(id) {
        return this.store.get(id) ?? null;
    }

    create(dto) {
        const id = nanoid(8);
        const brew = {id, ...dto};
        this.store.set(id, brew);
        return brew;
    }

    update(id, dto) {
        if (!this.store.has(id)) return null;
        const brew = {id, ...dto};
        this.store.set(id, brew);
        return brew;
    }

    delete(id) {
        return this.store.delete(id);
    }
}