import { z } from "zod";

export const verifyEmailSchema = z.object({
  verificationCode: z
    .string()
    .trim()
    .length(6, "OTP must be 6 digits")
    .regex(/^\d+$/, "OTP must be numeric"),
});
