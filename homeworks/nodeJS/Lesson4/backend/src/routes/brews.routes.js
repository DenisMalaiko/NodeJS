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

/*router.get('/brews', (req, res) => {
    ctl('list');

    /!*res.json({
        message: 'Hello World'
    });*!/
});*/

router.get(
    '/brews',
    ctl('list')
);

registry.registerPath({
    method: 'get',
    path: '/api/brews',
    tags: ['Brews'],
    responses: {
        200: {
            description: 'Array of brews',
            content: {'application/json': {schema: z.array(BrewDTO)}}
        }
    }
})

/*
router.get('/brews/:id', validateParams(paramsSchema), ctl('item'));
*/

export {router};