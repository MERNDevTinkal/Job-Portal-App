import axiosInstance from "@/lib/axios";

interface RecruiterProfileData {
    companyName: string;
    companyWebsite?: string;
    companyDescription?: string;
    companyLocation: string;
    profileImage?: string;
}

export const getRecruiterProfile = async (): Promise<RecruiterProfileData | null> => {
    try {
        const response = await axiosInstance.get("/profile/recruiter");
        return response.data.profile || null;
    } catch (error: any) {
        if (error.response?.status === 404) {
            return null;
        }
        throw new Error(error.response?.data?.message || "Failed to fetch profile");
    }
};

export const createRecruiterProfile = async (
    formData: FormData
): Promise<RecruiterProfileData> => {
    try {
        const response = await axiosInstance.post("/profile/recruiter", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data.profile;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message || "Failed to create profile"
        );
    }
};

export const updateRecruiterProfile = async (
    formData: FormData
): Promise<RecruiterProfileData> => {
    try {
        const response = await axiosInstance.put("/profile/recruiter", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data.profile;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message || "Failed to update profile"
        );
    }
};