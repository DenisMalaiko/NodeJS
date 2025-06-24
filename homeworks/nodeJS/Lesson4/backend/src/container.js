import { createContainer, asClass } from 'awilix';
import { BrewsModel } from '../models/brews.model.js';
import { BrewsService } from '../services/brews.service.js';
import { BrewsController } from '../controllers/brews.controller.js';
import { objectMap } from "../utils/Object.map.js";

const brewsModule = {
  brewsModule: BrewsModel,
  brewsService: BrewsService,
  brewsController: BrewsController
}

/**
 * injectionMode: ‘CLASSIC’ означає:
 * Awilix дивиться імена параметрів конструктора і підставляє
 * відповідні реєстраційні токени.
 *
 * У замість того, щоб створювати залежності вручну всередині кожного файлу, awilix дозволяє:
 * - оголосити всі сервіси/репозиторії/класові залежності один раз,
 * - автоматично впроваджувати (інжектити) їх туди, де потрібно.
 */

export const container = createContainer({ injectionMode: 'CLASSIC' })
  .register(
    objectMap(brewsModule, value => asClass(value)[value.scope]())
  );
