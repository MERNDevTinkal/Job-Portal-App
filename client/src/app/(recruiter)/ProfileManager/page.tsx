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

const indiaStates = ['Delhi', "Bihar", "Rajasthan", 'Maharashtra', 'Karnataka', 'Punjab'];
const usaStates = ['California', 'New York', 'Texas', 'Florida'];

type FormValues = z.infer<typeof recruiterProfileSchema>;

export default function RecruiterProfileManager() {
  const [states, setStates] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState<FormValues | null>(null);
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    watch,
    reset,
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
      profileImage: '',
    },
  });

  const selectedCountry = watch('country');

  useEffect(() => {
    setStates(selectedCountry === 'USA' ? usaStates : indiaStates);
  }, [selectedCountry]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await getRecruiterProfile();
        if (response.success && response.profile) {
          setProfile(response.profile);
          reset(response.profile);
        }
      } catch (error) {
        toast.error('Failed to fetch profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [reset]);

  const onSubmit = async (values: FormValues) => {
    try {
      let res;
      if (profile) {
        res = await updateRecruiterProfile(values);
      } else {
        res = await createRecruiterProfile(values);
      }

      if (res.success) {
        toast.success(`Profile ${profile ? 'updated' : 'created'} successfully`);
        setProfile(res.profile || values);
        setOpen(false);
      } else {
        toast.error(res.message || `Failed to ${profile ? 'update' : 'create'} profile`);
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-20">
        <Loader2 className="animate-spin h-8 w-8 text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {profile ? (
        <div className="border rounded-lg p-6 space-y-4">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-4">
              <button onClick={() => setOpen(true)} className="cursor-pointer">
                <FcBusinessman className="w-12 h-12" />
              </button>
              <h2 className="text-2xl font-bold">{profile.companyName}</h2>
            </div>
            <Button 
              variant="outline" 
              onClick={() => setOpen(true)}
            >
              Edit Profile
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold">Website</h3>
              <p>{profile.companyWebsite || 'Not provided'}</p>
            </div>
            <div>
              <h3 className="font-semibold">Location</h3>
              <p>
                {profile.companyLocation}, {profile.state}, {profile.country}
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold">About</h3>
            <p className="text-gray-600">
              {profile.companyDescription || 'No description provided'}
            </p>
          </div>
        </div>
      ) : (
        <div className="text-center py-8 border rounded-lg">
          <button onClick={() => setOpen(true)} className="cursor-pointer mx-auto">
            <FcBusinessman className="h-12 w-12" />
          </button>
          <h3 className="mt-2 text-lg font-medium">No Recruiter Profile</h3>
          <p className="mt-1 text-sm text-gray-500">
            Create your recruiter profile to get started.
          </p>
          <div className="mt-6">
            <Button onClick={() => setOpen(true)}>
              Create Recruiter Profile
            </Button>
          </div>
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {profile ? 'Update Recruiter Profile' : 'Create Recruiter Profile'}
            </DialogTitle>
            <DialogDescription>
              {profile
                ? 'Update your recruiter profile information'
                : 'Fill in your company details to create a recruiter profile'}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label>Company Name *</Label>
              <Input {...register('companyName')} />
              {errors.companyName && (
                <p className="text-red-500 text-sm">{errors.companyName.message}</p>
              )}
            </div>

            <div>
              <Label>Website</Label>
              <Input {...register('companyWebsite')} placeholder="https://example.com" />
              {errors.companyWebsite && (
                <p className="text-red-500 text-sm">{errors.companyWebsite.message}</p>
              )}
            </div>

            <div>
              <Label>Description</Label>
              <Textarea {...register('companyDescription')} rows={4} />
              {errors.companyDescription && (
                <p className="text-red-500 text-sm">{errors.companyDescription.message}</p>
              )}
            </div>

            <div>
              <Label>Location</Label>
              <Input {...register('companyLocation')} />
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
              <Label>Profile Image URL (Optional)</Label>
              <Input
                {...register('profileImage')}
                placeholder="https://example.com/image.jpg"
              />
              {errors.profileImage && (
                <p className="text-red-500 text-sm">{errors.profileImage.message}</p>
              )}
            </div>

            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {profile ? 'Updating...' : 'Creating...'}
                  </>
                ) : profile ? 'Update Profile' : 'Create Profile'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}