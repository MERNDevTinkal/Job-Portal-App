import axiosInstance from "@/lib/axios";
import axios from "axios";
import { GetAllJobsResponse } from "@/types/Job";

export const getAllJobs = async () => {
  try {
    const response = await axiosInstance.get<GetAllJobsResponse>("/job/");
    return response.data; 

  } catch (error) {
    console.error("Error in getAllJobs:", error);

    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response?.data?.message || "Unable to load jobs data");
    } else {
      throw new Error("Unable to load jobs for you");
    }
  }
};
