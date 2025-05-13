import axiosInstance from "@/lib/axios";
import axios from "axios";

export const deleteJob = async (jobId: string) => {
  try {
    const response = await axiosInstance.delete(`/job/${jobId}`);
    return response.data;
  } catch (error) {
    console.error("Error in Deleting Job:", error);
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response?.data?.message || "Unable to delete job");
    } else {
      throw new Error("Unable to delete job");
    }
  }
};