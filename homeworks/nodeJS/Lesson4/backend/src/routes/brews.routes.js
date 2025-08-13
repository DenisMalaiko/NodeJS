import { Router } from 'express';
import { z } from 'zod';
import { makeClassInvoker } from 'awilix-express';

import { BrewsController } from '../controllers/brews.controller.js';
import { asyncHandler } from '../middlewares/asyncHandler.js';
import { validate } from '../middlewares/validate.js';
import { registry } from '../openapi/registry.js';
import { BrewDTO } from '../dto/brew.dto.js';
import { validateParams } from '../middlewares/validateParams.js';
import rateLimit from 'express-rate-limit';

const router = Router();
const ctl = makeClassInvoker(BrewsController);
const paramsSchema = z.object({
    id: z.string().describe('Brew ID')
});
const postLimiter = rateLimit({
    windowMs: 60_000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Забагато POST-запитів. Спробуйте через хвилину.',
});

router.get('/brews', ctl('list'));
registry.registerPath({
    method: 'get',
    path: '/api/brews',
    tags: ['Brews'],
    parameters: [
        {
            name: 'method',
            in: 'query',
            required: false,
            schema: { type: 'string' },
            description: 'Метод'
        },
        {
            name: 'ratingMin',
            in: 'query',
            required: false,
            schema: { type: 'integer', minimum: 1, maximum: 5 },
            description: 'Рейтинг'
        },
    ],
    responses: {
        200: {
            description: 'Array of brews',
            content: {'application/json': {schema: z.array(BrewDTO)}}
        }
    }
});

router.get('/brews/:id', validateParams(paramsSchema), ctl('item'));
registry.registerPath({
    method: 'get',
    path: '/api/brews/{id}',
    tags: ['Brews'],
    request: {params: paramsSchema},
    responses: {
        200: {description: 'Brew', content: {'application/json': {schema: BrewDTO}}},
        404: {description: 'Brew not found'}
    }
});

router.post('/brews', postLimiter, validate(BrewDTO), asyncHandler(ctl('create')));
registry.registerPath({
    method: 'post',
    path: '/api/brews',
    tags: ['Brews'],
    request: {
        body: {required: true, content: {'application/json': {schema: BrewDTO}}}
    },
    responses: {
        201: {description: 'Created', content: {'application/json': {schema: BrewDTO}}},
        400: {description: 'Validation error'}
    }
});

router.put('/brews/:id', validateParams(paramsSchema), validate(BrewDTO), asyncHandler(ctl('update')));
registry.registerPath({
    method: 'put',
    path: '/api/brews/{id}',
    tags: ['Brews'],
    request: {
        params: paramsSchema,
        body: {required: true, content: {'application/json': {schema: BrewDTO}}}
    },
    responses: {
        200: {description: 'Updated brew', content: {'application/json': {schema: BrewDTO}}},
        400: {description: 'Validation error'},
        404: {description: 'User not found'}
    }
})

router.delete('/brews/:id', asyncHandler(ctl('delete')));
registry.registerPath({
    method: 'delete',
    path: '/api/brews/{id}',
    tags: ['Brews'],
    request: {params: paramsSchema},
    responses: {
        204: {description: 'Deleted'},
        404: {description: 'Brew not found'}
    }
})


export {router};