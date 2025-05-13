export interface CreateJobInput {
  title: string;
  description: string;
  jobType: "full-time" | "part-time" | "internship" | "remote";
  salary: string;
  openings: number;
}

