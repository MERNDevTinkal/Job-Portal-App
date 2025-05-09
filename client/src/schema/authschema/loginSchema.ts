import { z } from "zod";
import { emailValidation } from "./registerSchema"
import { passwordValidation } from "./registerSchema"

export const loginSchema = z.object({
    email : emailValidation,
    password : passwordValidation,
});