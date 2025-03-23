import joi from 'joi';

export const gamePostSchema = joi.object({
  name: joi.string().trim().min(1).required(), 
  image: joi.string().trim().required(),
  stockTotal: joi.number().positive().strict().required(), 
  pricePerDay: joi.number().positive().strict().required()  
});
