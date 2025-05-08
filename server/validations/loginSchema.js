import { z } from "zod";
import { emailValidation } from "./registerSchema.js";
import { passwordValidation } from "./registerSchema.js";

export const loginSchema = z.object({
    email : emailValidation,
    password : passwordValidation,
});