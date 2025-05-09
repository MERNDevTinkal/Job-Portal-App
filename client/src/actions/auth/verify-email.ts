import axiosInstance from "@/lib/axios";
import { verifyEmail } from "@/types/verify-email";
import axios from "axios";

export const verifyEmailForRegister = async (data : verifyEmail) =>{

    try {
        const response = await axiosInstance.post("auth/verify-email",data)
        return response.data;
    } catch (error) {
        console.error("Email verification error :",error)
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message || "Email verification failed");
        } else {
            throw new Error("Email verification failed");
        }
    }
}