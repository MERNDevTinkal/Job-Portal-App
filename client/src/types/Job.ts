export interface Job {
  _id: string;
  title: string;
  description: string;
  salary: string;
  openings: number;
  isActive: boolean;
    jobType: "full-time" | "part-time" | "internship" | "remote";
  recruiter: {
    name: string;
    email: string;
        _id: string;
  };
  recruiterProfile: {
    companyName: string;
    companyLocation: string;
        _id: string;
  };

}

export interface GetAllJobsResponse {
  success: boolean;
  jobs: Job[];
}
