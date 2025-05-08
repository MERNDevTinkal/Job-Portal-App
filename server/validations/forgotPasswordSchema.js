import { z } from "zod";
import { emailValidation } from "./registerSchema.js";

export const forgotPasswordSchema = z.object({
    email : emailValidation,
});