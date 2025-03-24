import joi from 'joi';

export const rentalPostSchema = joi.object({
  customerId: joi.number().positive().required(),
  gameId: joi.number().positive().required(),
  daysRented: joi.number().positive().greater(0).required()
});
