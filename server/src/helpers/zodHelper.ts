import { z } from "zod";
import { isValidDate } from "./common";

export const enumGenerator = (options: string[], message: string) => {
  return z.enum([...(options as [string, ...string[]])], { message });
};

export const dateGenerator = (required_error: string, message: string) => {
  return z.string({ required_error }).refine((date) => isValidDate(date), { message });
};
