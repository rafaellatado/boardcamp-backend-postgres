import { Router } from 'express';
import rentalsController from '../controllers/rentalsController.js';
import { validateSchemaMiddleware } from '../middlewares/schemaMiddleware.js';
import { rentalPostSchema } from '../schemas/rentalSchema.js';

const rentalsRouter = Router();

rentalsRouter.get('/rentals', rentalsController.getRentals);
rentalsRouter.post('/rentals', validateSchemaMiddleware(rentalPostSchema), rentalsController.postRental);
rentalsRouter.post('/rentals/:id/return', rentalsController.returnRental);
rentalsRouter.delete("/rentals/:id", rentalsController.deleteRental);

export default rentalsRouter;
