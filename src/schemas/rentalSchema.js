import joi from 'joi';

export const rentalPostSchema = joi.object({
  customerId: joi.number().positive().strict().required(), 
  gameId: joi.number().positive().strict().required(), 
  daysRented: joi.number().positive().strict().required()
});
