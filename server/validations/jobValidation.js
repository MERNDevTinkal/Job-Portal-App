import { z } from "zod";

export const createJobSchema = z.object({
  title: z.string().min(1, "Title is required"),
  skills: z.array(z.string()).min(1, "At least one skill is required"),
  jobCategory: z.enum([
    "IT & Software",
    "Marketing & Sales",
    "Finance & Accounting",
    "Healthcare & Medicine",
    "Education & Training",
    "Engineering",
    "Design & Creative",
    "Human Resources",
    "Customer Service",
    "Administration",
    "Construction & Trades",
    "Hospitality & Tourism",
    "Legal",
    "Science & Research",
    "Other",
  ]),
  jobType: z.enum(["full-time", "part-time", "internship", "remote"]),
  salary: z.object({
    min: z.number().min(0, "Min salary cannot be negative"),
    max: z.number().min(0, "Max salary cannot be negative"),
  }).refine(data => data.max >= data.min, {
    message: "Max salary must be greater than or equal to min salary",
  }),
  experience: z.object({
    min: z.number().min(0, "Min experience cannot be negative"),
    max: z.number().min(0, "Max experience cannot be negative"),
  }).refine(data => data.max >= data.min, {
    message: "Max experience must be greater than or equal to min experience",
  }),
  openings: z.number().min(1, "Openings must be at least 1"),
  jobCategory: z.string(),
});
