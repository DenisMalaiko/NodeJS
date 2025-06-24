import { Router } from 'express';
import { z } from 'zod';
import { makeClassInvoker } from 'awilix-express';

import { BrewsController } from '../controllers/brews.controller.js';
import { validateParams } from '../middlewares/validateParams.middleware.js';

const brewsRouter = Router();
const ctl = makeClassInvoker(BrewsController);

const paramsSchema = z.object({
    id: z.string().describe('Brew ID')
});

brewsRouter.get('/brews', ctl('list'));

brewsRouter.get('/brews/:id', validateParams(paramsSchema), ctl('item'));

export default brewsRouter;