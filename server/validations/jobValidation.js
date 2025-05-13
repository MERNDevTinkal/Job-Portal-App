import { z } from "zod";

export const createJobSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  jobType: z.enum(["full-time", "part-time", "internship", "remote"], {
    errorMap: () => ({ message: "Invalid job type" }),
  }),
  salary: z.string().min(1, "Salary is required"),
  openings: z
    .number({ invalid_type_error: "Openings must be a number" })
    .min(1, "At least 1 opening is required"),
});
