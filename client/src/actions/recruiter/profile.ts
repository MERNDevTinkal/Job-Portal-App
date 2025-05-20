import axiosInstance from '@/lib/axios';
import axios from 'axios';

export interface RecruiterProfileData {
  companyName: string;
  companyWebsite: string;
  companyDescription: string;
  companyLocation: string;
  country: string;
  state: string;
  profileImage?: string;
}

export const createRecruiterProfile = async (data: RecruiterProfileData) => {
  try {
    const response = await axiosInstance.post('/profile/recruiter', data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.data?.message === "Profile already exists for this user") {
        return { success: false, message: "You already have a profile. Please edit your existing profile." };
      }
      return { success: false, message: error.response?.data?.message || "Failed to create profile" };
    }
    return { success: false, message: "Failed to create profile" };
  }
};

export const updateRecruiterProfile = async (data: RecruiterProfileData) => {
  try {
    const response = await axiosInstance.put('/profile/recruiter', data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { success: false, message: error.response?.data?.message || "Failed to update profile" };
    }
    return { success: false, message: "Failed to update profile" };
  }
};

export const getRecruiterProfile = async () => {
  try {
    const response = await axiosInstance.get('/profile/recruiter');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return { success: true, profile: null };
    }
    return { success: false, message: "Failed to fetch profile" };
  }
};