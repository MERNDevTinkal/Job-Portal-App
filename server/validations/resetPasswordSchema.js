import { z } from "zod";
import { passwordValidation } from "./registerSchema.js";

export const tokenValidation = z
  .string()
  .trim()
  

export const resetPasswordSchema = z.object({
    newPassword : passwordValidation,
    token:tokenValidation,
})














