import { z } from "zod";
import { passwordValidation } from "./registerSchema";  

export const tokenValidation = z
  .string()
  .trim();

export const resetPasswordSchema = z.object({
  newPassword: passwordValidation,
  confirmPassword: passwordValidation,
  token: tokenValidation,  
})

.refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
