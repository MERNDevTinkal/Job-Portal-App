import * as z from "zod";

export const recruiterProfileSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  companyWebsite: z.string().url("Invalid URL"),
  companyDescription: z.string().min(1, "Company description is required"),
  companyLocation: z.string().min(1, "Location is required"),
  country: z.string().min(1, "Country is required"),
  state: z.string().min(1, "State is required"),
  profileImage: z
    .string()
    .url("Invalid URL")
    .optional()
    .or(z.literal('')),
});
