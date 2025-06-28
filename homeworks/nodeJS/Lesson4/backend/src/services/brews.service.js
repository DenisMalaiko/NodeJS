export class BrewsService {
    static scope = 'scoped';

    constructor(brewsModel) {
        console.log(`BrewsService initialized`);
        this.brewsModel = brewsModel;
    }

    list(queryParams) {
        return this.brewsModel.list(queryParams);
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
        return this.brewsModel.delete(id);
    }
}