import axiosInstance from "@/lib/axios";
import axios from "axios";
import { CreateJobInput } from "@/types/createjob";

export const updateJob = async (jobId: string, jobData: CreateJobInput) => {
  try {
    const response = await axiosInstance.put(`/job/${jobId}`, jobData);
    return response.data;
  } catch (error) {
    console.error("Error in Editing Job:", error);
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response?.data?.message || "Unable to update job");
    } else {
      throw new Error("Unable to update Job");
    }
  }
};