import axiosInstance from "@/lib/axios";
import axios from "axios";
import { CreateJobInput } from "@/types/createjob";

export const createJob = async (jobData : CreateJobInput) => {
  try {
    const response = await axiosInstance.post("/job/",jobData);
    return response.data; 

  } catch (error) {
    console.error("Error in CreateJobs:", error);

    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response?.data?.message || "Unable to create job");
    } else {
      throw new Error("Unable to create job");
    }
  }
};
