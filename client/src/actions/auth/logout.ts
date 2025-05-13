import axiosInstance from "@/lib/axios";
import axios from "axios";


export const logOutUser = async () => {

    try {
        const response = await axiosInstance.post("/auth/logout");
        localStorage.removeItem("token");
        return response;
    } catch (error) {
        console.error("logout error :", error);

        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message || "logout failed");
        } else {
            throw new Error("logout failed");
        }

    }
}