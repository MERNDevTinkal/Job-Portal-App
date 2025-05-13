import { z } from "zod";

export const createJobSchema = z.object({
  title: z.string().min(1, "Title is required").trim(),
  description: z.string().min(1, "Description is required").trim(),
  jobType: z.enum(["full-time", "part-time", "internship", "remote"]),
  salary: z.string().min(1, "Salary is required").trim(),
  openings: z.coerce.number().min(1, "Openings must be at least 1"),
});

export type CreateJobInput = z.infer<typeof createJobSchema>;
