import { z } from "zod";
import { emailValidation } from "./registerSchema";

export const forgotPasswordSchema = z.object({
  email:emailValidation,
});
