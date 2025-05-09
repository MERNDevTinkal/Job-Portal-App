import axiosInstance from "@/lib/axios";
import axios from "axios";
import { forgotPassword } from "@/types/forgotPassword";

export const forgotpassword = async(data :forgotPassword ) =>{
    try {
        const response = await axiosInstance.post("auth/forgotPassword",data)
        return response.data;
    } catch (error) {
        console.error("Error in forgotPassword",error);
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message || " forgotPassword failed");
        } else {
            throw new Error("forgotPassword failed");
        }
    }
}