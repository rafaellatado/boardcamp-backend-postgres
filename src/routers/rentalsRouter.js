import { Router } from 'express';
import rentalsController from '../controllers/rentalsController.js';
import { validateSchemaMiddleware } from '../middlewares/schemaMiddleware.js';
import { rentalPostSchema } from '../schemas/rentalSchema.js';

const rentalsRouter = Router();

rentalsRouter.get('/rentals', rentalsController.getRentals);
rentalsRouter.post('/rentals', validateSchemaMiddleware(rentalPostSchema), rentalsController.postRental);
/* rentalsRouter.delete('/rentals', rentalsController.deleteRental); */

export default rentalsRouter;
