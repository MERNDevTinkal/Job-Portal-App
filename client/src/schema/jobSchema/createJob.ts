import { z } from "zod";

export const createJobSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  skills: z.string().min(1, "Skills are required"),
  jobType: z.enum(["full-time", "part-time", "internship", "remote"]),
  salaryMin: z.number().min(0, "Salary must be positive"),
  salaryMax: z.number().min(0, "Salary must be positive"),
  experienceMin: z.number().min(0, "Experience must be positive"),
  experienceMax: z.number().min(0, "Experience must be positive"),
  openings: z.number().min(1, "At least 1 opening required"),
  jobCategory: z.string().min(1, "Job category is required"),
});