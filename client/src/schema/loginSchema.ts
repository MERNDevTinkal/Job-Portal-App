import { z } from "zod";
import { emailValidation } from "./authschema/registerSchema";
import { passwordValidation } from "./authschema/registerSchema";

export const loginSchema = z.object({
    email : emailValidation,
    password : passwordValidation,
});