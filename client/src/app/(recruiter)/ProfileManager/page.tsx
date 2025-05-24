// components/RecruiterProfileDialog.tsx
'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { recruiterProfileSchema } from '@/schema/RecruiterProfile/recruiterProfileValidation';
import { z } from 'zod';
import { createRecruiterProfile, updateRecruiterProfile, getRecruiterProfile } from '@/actions/recruiter/profile';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { FcBusinessman } from 'react-icons/fc';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';

const indiaStates = ['Delhi', "Bihar", "Rajasthan", 'Maharashtra', 'Karnataka', 'Punjab'];
const usaStates = ['California', 'New York', 'Texas', 'Florida'];

type FormValues = z.infer<typeof recruiterProfileSchema>;

export default function RecruiterProfileDialog() {
  const [states, setStates] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState<FormValues | null>(null);
  const [isFetchingProfile, setIsFetchingProfile] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(recruiterProfileSchema),
    defaultValues: {
      companyName: '',
      companyWebsite: '',
      companyDescription: '',
      companyLocation: '',
      country: 'India',
      state: '',
    },
  });

  const selectedCountry = watch('country');

  useEffect(() => {
    setStates(selectedCountry === 'USA' ? usaStates : indiaStates);
  }, [selectedCountry]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setPreviewImage(reader.result as string);
        }
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const removeImage = () => {
    setPreviewImage(null);
    setFile(null);
    setValue('profileImage', '');
  };

  const fetchProfile = async () => {
    try {
      setIsFetchingProfile(true);
      const response = await getRecruiterProfile();
      if (response.success) {
        if (response.profile) {
          setProfileData(response.profile);
          reset({
            companyName: response.profile.companyName || '',
            companyWebsite: response.profile.companyWebsite || '',
            companyDescription: response.profile.companyDescription || '',
            companyLocation: response.profile.companyLocation || '',
            country: response.profile.country || 'India',
            state: response.profile.state || '',
          });
          
          if (response.profile.profileImage) {
            setPreviewImage(response.profile.profileImage);
          }
        } else {
          reset();
          setPreviewImage(null);
        }
      }
    } catch (error) {
      toast.error('Failed to fetch profile');
      console.error(error);
    } finally {
      setIsFetchingProfile(false);
    }
  };

  const handleOpenChange = async (open: boolean) => {
    setOpen(open);
    if (open) {
      await fetchProfile();
    } else {
      setProfileData(null);
      setPreviewImage(null);
      setFile(null);
    }
  };

  const onSubmit = async (values: FormValues) => {
    try {
      setLoading(true);
      
      const formData = new FormData();
      formData.append('companyName', values.companyName);
      formData.append('companyWebsite', values.companyWebsite);
      formData.append('companyDescription', values.companyDescription);
      formData.append('companyLocation', values.companyLocation);
      formData.append('country', values.country);
      formData.append('state', values.state);
      
      if (file) {
        formData.append('profileImage', file);
      }

      let res;
      if (profileData) {
        res = await updateRecruiterProfile(formData);
      } else {
        res = await createRecruiterProfile(formData);
      }

      if (res.success) {
        toast.success(`Profile ${profileData ? 'updated' : 'created'} successfully`);
        setOpen(false);
        if (res.profile) {
          setProfileData(res.profile);
          setPreviewImage(res.profile.profileImage || null);
        }
      } else {
        toast.error(res.message || `Failed to ${profileData ? 'update' : 'create'} profile`);
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2">
          <FcBusinessman className="text-xl" />
          <span className="hidden sm:inline">Recruiter Profile</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {profileData ? 'Your Recruiter Profile' : 'Create Recruiter Profile'}
          </DialogTitle>
          <DialogDescription>
            {profileData
              ? 'View and update your recruiter profile information'
              : 'Fill in your company details to create a recruiter profile'}
          </DialogDescription>
        </DialogHeader>

        {isFetchingProfile ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label>Company Name *</Label>
              <Input
                {...register('companyName')}
                disabled={isSubmitting}
              />
              {errors.companyName && (
                <p className="text-red-500 text-sm">{errors.companyName.message}</p>
              )}
            </div>

            <div>
              <Label>Website</Label>
              <Input
                {...register('companyWebsite')}
                disabled={isSubmitting}
                placeholder="https://yourcompany.com"
              />
              {errors.companyWebsite && (
                <p className="text-red-500 text-sm">{errors.companyWebsite.message}</p>
              )}
            </div>

            <div>
              <Label>Description</Label>
              <Textarea
                {...register('companyDescription')}
                disabled={isSubmitting}
                rows={4}
                placeholder="Tell us about your company..."
              />
              {errors.companyDescription && (
                <p className="text-red-500 text-sm">{errors.companyDescription.message}</p>
              )}
            </div>

            <div>
              <Label>Location</Label>
              <Input
                {...register('companyLocation')}
                disabled={isSubmitting}
                placeholder="Company physical address"
              />
              {errors.companyLocation && (
                <p className="text-red-500 text-sm">{errors.companyLocation.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Country</Label>
                <select
                  {...register('country')}
                  className="border rounded p-2 w-full"
                  disabled={isSubmitting}
                >
                  <option value="India">India</option>
                  <option value="USA">USA</option>
                </select>
                {errors.country && (
                  <p className="text-red-500 text-sm">{errors.country.message}</p>
                )}
              </div>

              <div>
                <Label>State</Label>
                <select
                  {...register('state')}
                  className="border rounded p-2 w-full"
                  disabled={isSubmitting}
                >
                  <option value="">Select State</option>
                  {states.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
                {errors.state && (
                  <p className="text-red-500 text-sm">{errors.state.message}</p>
                )}
              </div>
            </div>

            <div>
              <Label>Profile Image</Label>
              {previewImage ? (
                <div className="mt-2 space-y-2">
                  <div className="relative w-32 h-32">
                    <Image
                      src={previewImage}
                      alt="Profile preview"
                      fill
                      className="rounded object-cover"
                      unoptimized={process.env.NODE_ENV !== 'production'} // Disable optimization in development
                    />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={removeImage}
                    disabled={isSubmitting}
                  >
                    Remove Image
                  </Button>
                </div>
              ) : (
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  disabled={isSubmitting}
                  className="cursor-pointer"
                />
              )}
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || isFetchingProfile}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {profileData ? 'Updating...' : 'Creating...'}
                  </>
                ) : profileData ? 'Update Profile' : 'Create Profile'}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}