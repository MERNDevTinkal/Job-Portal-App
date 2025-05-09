import axios from "axios";
import axiosInstance from "@/lib/axios";
import { ResetPassword } from "@/types/ResetPassword";

export const resetPassword = async(data :ResetPassword) =>{

    try {
        const responce = await axiosInstance.post("/auth/resetPassword",data)
        return responce.data;

    } catch (error) {
        console.error("Error in resetPassword:", error);
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message || "resetPassword failed");
        } else {
            throw new Error("resetPassword failed");
        }
    }
}