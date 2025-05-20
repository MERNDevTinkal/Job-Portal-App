export interface Job {
  _id: string;
  title: string;
  skills: string[];

  jobCategory: string;

  salary: {
    min: number;
    max: number;
  };

  experience: {
    min: number;
    max: number;
  };

  openings: number;
  isActive: boolean;

  jobType: "full-time" | "part-time" | "internship" | "remote";

  recruiter: {
    _id: string;
    name: string;
    email: string;
  };

  recruiterProfile: {
    _id: string;
    companyName: string;
    companyLocation: string;
  };
}

export interface GetAllJobsResponse {
  success: boolean;
  jobs: Job[];
}
