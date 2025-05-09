import axiosInstance from "@/lib/axios";
import { LoginData } from "@/types/login";
import axios from "axios";


export const loginUser = async (data: LoginData) => {

    try {
        const response = await axiosInstance.post("/auth/login", data);
        return response.data;
    } catch (error) {
        console.error("Login error :", error);
        
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message || "Login failed");
        } else {
            throw new Error("Login failed");
        }

    }
}