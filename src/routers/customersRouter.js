import { Router } from 'express';
import customersController from '../controllers/customersController.js';
import { validateSchemaMiddleware } from '../middlewares/schemaMiddleware.js';
import { customerPostSchema } from '../schemas/customerSchema.js';

const customersRouter = Router(); 

customersRouter.get('/customers', customersController.getCustomers);
customersRouter.get('/customers/:id', customersController.getCustomerById);
customersRouter.post('/customers', validateSchemaMiddleware(customerPostSchema), customersController.postCustomer);

export default customersRouter; 
