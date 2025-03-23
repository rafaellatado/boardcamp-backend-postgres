import joi from 'joi';

export const customerPostSchema = joi.object({
  name: joi.string().trim().min(1).required(), 
  phone: joi.string().min(10).max(11).pattern(/^\d+$/).required(),
  cpf: joi.string().length(11).pattern(/^\d{11}$/).required(), 
});
