import { z } from 'zod';

export const createRecruiterProfileSchema = z.object({
  companyName: z.string({
    required_error: "Company name is required",
  })
  .trim()
  .min(1, "Company name is required")
  .max(100, "Company name cannot exceed 100 characters"),
  
  companyWebsite: z.string({
    required_error: "Company website is required",
  })
  .trim()
  .min(1, "Company website is required")
  .url("Please enter a valid website URL"),
  
  companyDescription: z.string({
    required_error: "Company description is required",
  })
  .trim()
  .min(1, "Company description is required")
  .max(1000, "Description cannot exceed 1000 characters"),
  
  companyLocation: z.string({
    required_error: "Company location is required",
  })
  .trim()
  .min(1, "Company location is required")
  .max(100, "Location cannot exceed 100 characters"),
  
  country: z.string({
    required_error: "Country is required",
  }),
  
  state: z.string({
    required_error: "State is required",
  }),
 
  profileImage: z.string().optional(),
});

