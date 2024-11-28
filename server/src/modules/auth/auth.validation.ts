import { z } from "zod";
import { enumGenerator } from "../../helpers/zodHelper";
import { PROVIDERS, UserTable } from "../../db/schema/userTable";
import { createInsertSchema } from "drizzle-zod";

const registerSchema = createInsertSchema(UserTable, {
  name: (schema) => schema.name.min(1, { message: "Name is required" }),
  email: (schema) => schema.email.email({ message: "Invalid email" }),
  password: (schema) => schema.password.optional(),
  provider: enumGenerator(Object.values(PROVIDERS), "Invalid Provider"),
  imageUrl: (schema) => schema.imageUrl.optional(),
}).superRefine((val, ctx) => {
  // when provider is credentials password is required
  if (val.provider === PROVIDERS.CREDENTIALS && !val.password) {
    ctx.addIssue({
      code: "custom",
      message: "password is required",
      path: ["password"],
    });
  }
});

export type TRegisterPayload = z.infer<typeof registerSchema> & { provider: PROVIDERS };

export const authValidation = { registerSchema };
