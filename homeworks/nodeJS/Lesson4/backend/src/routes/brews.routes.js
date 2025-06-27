import { Router } from 'express';
import { z } from 'zod';
import { makeClassInvoker } from 'awilix-express';

import { BrewsController } from '../controllers/brews.controller.js';
import {asyncHandler} from '../middlewares/asyncHandler.js';
import {validate} from '../middlewares/validate.js';
import {registry} from '../openapi/registry.js';
import {BrewDTO} from '../dto/brew.dto.js';
import { validateParams } from '../middlewares/validateParams.js';

const router = Router();
const ctl = makeClassInvoker(BrewsController);

const paramsSchema = z.object({
    id: z.string().describe('Brew ID')
});

router.get(
    '/brews',
    ctl('list')
);

router.get(
    '/brews/:id',
    validateParams(paramsSchema),
    ctl('item')
);

router.post(
    '/brews',
    validate(BrewDTO),
    asyncHandler(ctl('create'))
);


router.put(
    '/brews/:id',
    validateParams(paramsSchema),
    validate(BrewDTO),
    asyncHandler(ctl('update'))
);


router.delete(
    '/brews/:id',
    asyncHandler(ctl('delete'))
);


export {router};