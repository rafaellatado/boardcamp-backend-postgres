import { joiError } from "../errors/errors.js";

export function validateSchemaMiddleware(postSchema) {
  return (req, res, next) => {
 
    const validation = postSchema.validate(req.body, { abortEarly: false }); 
    if (validation.error) {
      const messages = validation.error.details.map(detail => detail.message);

      throw joiError(messages);
    }

    next();
  }
} 
