export class BrewsController {
    static scope = 'scoped'; // <- вказуємо, що контролер буде інжектовано в контекст запиту

    constructor(brewsService) {// <- інжектовано сервіс
        console.log(`BrewController initialized`);
        this.brewService = brewsService;
    }

    list(_req, res) {
        console.log("CONTROLLER list")
        return res.json(this.brewService.list());
    }

    item(req, res) {
        return res.json(this.brewService.getOne(req.params.id))
    }

    create(req, res) {
        return res.status(201).json(this.brewService.create(req.body));
    }

    update(req, res) {
        return res.json(this.brewService.update(req.params.id, req.body));
    }

    delete(req, res) {
        this.brewService.delete(req.params.id);
        res.status(204).end();
    };
}