import { AnyZodObject, ZodEffects } from "zod";
import { catchAsync } from "./catchAsync";

export const validationHandler = (schema: AnyZodObject | ZodEffects<AnyZodObject>) => {
  return catchAsync(async (req, _, next) => {
    const data = await schema.parseAsync(req.body);
    req.body = data;
    next();
  });
};
