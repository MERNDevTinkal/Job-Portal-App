import axiosInstance from "@/lib/axios";
import { LoginData } from "@/types/login";

export const loginUser = async (data :LoginData) =>{

    try {
        const response = await axiosInstance.post("/auth/login",data);
        return response.data;
    } catch (error) {
        console.error("Login error :", error);
        throw new Error ("something went wrong during login ")
    }
}