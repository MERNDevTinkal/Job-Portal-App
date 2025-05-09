import axiosInstance from "@/lib/axios";
import { RegisterData } from "@/types/register";
import axios from "axios";

export const registerUser = async (data: RegisterData) => {
    try {
        const response = await axiosInstance.post("/auth/", data);
        return response.data;
    } catch (error) {
        console.error("Registration error:", error);
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message || "Registration failed");
        } else {
            throw new Error("Registration failed");
        }
    }
};
