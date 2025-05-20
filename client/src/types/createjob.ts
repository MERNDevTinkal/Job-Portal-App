export interface CreateJobInput {
  title: string;
  skills: string[]; 
  jobType: "full-time" | "part-time" | "internship" | "remote";
  salary: {
    min: number;
    max: number;
  };
  experience: {
    min: number;
    max: number;
  };
  openings: number;
  jobCategory: string;
}