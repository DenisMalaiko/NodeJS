export class BrewsService {
    static scope = 'scoped'; // <- вказуємо, що це Scoped Service
    constructor(brewsModel) {          // <- інжектовано модель
        console.log(`BrewsService initialized`);
        this.brewsModel = brewsModel;
    }

    list() {
        return this.brewsModel.list();
    }

    getOne(id) {
        return this.brewsModel.find(id);
    }

    create(dto) {
        return this.brewsModel.create(dto);
    }

    update(id, dto) {
        return this.brewsModel.update(id, dto);
    }

    delete(id) {
        return this.brewsModel.remove(id);
    }
}