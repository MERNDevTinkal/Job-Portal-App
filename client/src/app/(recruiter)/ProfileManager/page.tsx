"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FcBusinessman } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  createRecruiterProfile,
  updateRecruiterProfile,
  getRecruiterProfile,
} from "@/actions/recruiter/profile";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ProfileFormData {
  companyName: string;
  companyWebsite: string;
  companyDescription: string;
  companyLocation: string;
  profileImage?: FileList;
}

interface RecruiterProfile {
  companyName: string;
  companyWebsite: string;
  companyDescription: string;
  companyLocation: string;
  profileImage?: string;
}

const ProfileManager = () => {
  const router = useRouter();
  const [profile, setProfile] = useState<RecruiterProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [previewImage, setPreviewImage] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormData>();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getRecruiterProfile();
        if (data) {
          setProfile(data);
          setValue("companyName", data.companyName);
          setValue("companyWebsite", data.companyWebsite || "");
          setValue("companyDescription", data.companyDescription || "");
          setValue("companyLocation", data.companyLocation);
          if (data.profileImage) {
            setPreviewImage(data.profileImage);
          }
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchProfile();
    }
  }, [isOpen, setValue]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data: ProfileFormData) => {
    try {
      const formData = new FormData();
      formData.append("companyName", data.companyName);
      formData.append("companyWebsite", data.companyWebsite);
      formData.append("companyDescription", data.companyDescription);
      formData.append("companyLocation", data.companyLocation);

      if (data.profileImage && data.profileImage[0]) {
        formData.append("profileImage", data.profileImage[0]);
      }

      let response;
      if (profile) {
        response = await updateRecruiterProfile(formData);
        toast.success("Profile updated successfully!");
      } else {
        response = await createRecruiterProfile(formData);
        toast.success("Profile created successfully!");
      }

      setProfile(response);
      setIsOpen(false);
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "Failed to save profile");
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="hover:cursor-pointer p-0 rounded-full"
      >
        <FcBusinessman className="h-10 w-10" />
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {profile ? "Update Profile" : "Create Profile"}
            </DialogTitle>
          </DialogHeader>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
              <div className="flex flex-col items-center">
                <div className="relative w-24 h-24 mb-4">
                  {(previewImage || profile?.profileImage) ? (
                    <Image
                      src={previewImage || profile?.profileImage || ""}
                      alt="Profile Preview"
                      fill
                      className="rounded-full object-cover border-2 border-gray-300"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
                      <FcBusinessman className="h-12 w-12" />
                    </div>
                  )}
                </div>
                <Label htmlFor="profileImage" className="cursor-pointer">
                  <span className="text-blue-600 hover:text-blue-800">
                    {previewImage ? "Change Image" : "Upload Image"}
                  </span>
                  <Input
                    id="profileImage"
                    type="file"
                    accept="image/*"
                    {...register("profileImage")}
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </Label>
              </div>

              <div>
                <Label htmlFor="companyName">Company Name*</Label>
                <Input
                  id="companyName"
                  {...register("companyName", { required: "Company name is required" })}
                />
                {errors.companyName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.companyName.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="companyWebsite">Company Website</Label>
                <Input
                  id="companyWebsite"
                  {...register("companyWebsite")}
                  placeholder="https://example.com"
                />
              </div>

              <div>
                <Label htmlFor="companyDescription">Company Description</Label>
                <Textarea
                  id="companyDescription"
                  {...register("companyDescription")}
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="companyLocation">Company Location*</Label>
                <Input
                  id="companyLocation"
                  {...register("companyLocation", {
                    required: "Location is required",
                  })}
                />
                {errors.companyLocation && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.companyLocation.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {isSubmitting
                  ? "Saving..."
                  : profile
                  ? "Update Profile"
                  : "Create Profile"}
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProfileManager;