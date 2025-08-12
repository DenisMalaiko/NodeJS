export class BrewsController {
    static scope = 'scoped'; // <- вказуємо, що контролер буде інжектовано в контекст запиту

    constructor(brewsService) {// <- інжектовано сервіс
        console.log(`BrewController initialized`);
        this.brewService = brewsService;
    }

    list(_req, res) {
        const queryParams = _req.query;
        console.log("Params ", queryParams);
        const result = this.brewService.list(queryParams);

        if (!result.length) {
            return res.status(404).json({ error: 'Not found' });
        }

        return res.json(result);
    }

    item(req, res) {
        const id = req?.params?.id;

        if (!id) {
            return res.status(404).json({ error: 'Not found' });
        }

        const item = this.brewService.getOne(id);

        if (!item) {
            return res.status(404).json({ error: 'Not found' });
        }

        return res.json(item);
    }

    create(req, res) {
        console.log("START CREATING ", req.body);

        if (!req.body) {
            return res.status(404).json({ error: 'Not found' });
        }

        return res.status(201).json(this.brewService.create(req.body));
    }

    update(req, res) {
        const id = req?.params?.id;

        if (!id) {
            return res.status(404).json({ error: 'Not found' });
        }

        const result = this.brewService.update(req.params.id, req.body)

        console.log("RESULT ", result);

        if (!result) {
            return res.status(404).json({ error: 'Not found' });
        }

        return res.json(result);
    }

    delete(req, res) {
        const id = req?.params?.id;

        if (!id) {
            return res.status(404).json({ error: 'Not found' });
        }

        const item = this.brewService.delete(req.params.id);

        if (!item) {
            return res.status(404).json({ error: 'Not found' });
        }

        res.status(204).end();
    };
}