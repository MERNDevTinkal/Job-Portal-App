
import { z } from "zod";

export const nameRegex = /^(?=(?:.*[A-Za-z]){3,})[A-Za-z ]+$/;
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d\s])[^\s]{8,}$/;

export const nameValidation = z
  .string()
  .trim()
  .min(3, "Name must be at least 3 characters long")
  .regex(nameRegex, "Name must contain only letters with no spaces or numbers");

export const emailValidation = z
  .string()
  .trim()
  .regex(emailRegex, "Invalid email format")
  .transform((val) => val.toLowerCase());

export const passwordValidation = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .regex(passwordRegex, "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character");

  export const roleEnum = z
  .string()
  .trim()
  .transform((val) => val.toLowerCase())
  .refine(
    (val) => val === "recruiter" || val === "jobseeker",
    { message: "Role must be either 'recruiter' or 'jobseeker'" }
  );
 

export const registerSchema = z.object({
  name: nameValidation,
  email: emailValidation,
  password: passwordValidation,
  role: roleEnum,
  profileImage: z.string().optional(),
  resume: z.string().optional(),
});
