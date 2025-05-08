import axiosInstance from "@/lib/axios";
import { RegisterData } from "@/types/register";

export const registerUser = async (data: RegisterData) => {
    try {
        const response = await axiosInstance.post("/auth/", data);
        return response.data;
    } catch (error) {
        console.error("Registration error:", error);
        throw new Error("Something went wrong during registration.");
    }
};
