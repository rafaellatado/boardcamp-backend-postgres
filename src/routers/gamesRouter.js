import { Router } from 'express';
import gamesController from '../controllers/gamesController.js';
import { validateSchemaMiddleware } from '../middlewares/schemaMiddleware.js';
import { gamePostSchema } from '../schemas/gameSchema.js';

const gamesRouter = Router()

gamesRouter.get('/games', gamesController.getGames);
gamesRouter.post('/games', validateSchemaMiddleware(gamePostSchema), gamesController.postGame)

export default gamesRouter;
