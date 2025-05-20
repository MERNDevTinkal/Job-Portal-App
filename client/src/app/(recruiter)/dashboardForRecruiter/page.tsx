"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createJobSchema } from "@/schema/jobSchema/createJob";
import { z } from "zod";
import { GetAllJobsResponse, Job } from "@/types/Job";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createJob } from "@/actions/recruiter/createJobs";
import { updateJob } from "@/actions/recruiter/editJob";
import { getAllJobs } from "@/actions/recruiter/getAllJobs";
import { deleteJob } from "@/actions/recruiter/deleteJob";
import Navbar from "@/components/RecruiterComponents/Navbar";
import RecruiterProfileDialog from "../ProfileManager/page";

type FormData = z.infer<typeof createJobSchema>;

const jobCategories = [
  "IT & Software",
  "Marketing & Sales",
  "Finance & Accounting",
  "Healthcare & Medicine",
  "Education & Training",
  "Engineering",
  "Design & Creative",
  "Human Resources",
  "Customer Service",
  "Administration",
  "Construction & Trades",
  "Hospitality & Tourism",
  "Legal",
  "Science & Research",
  "Other",
];

const DashboardForRecruiter = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [jobToDelete, setJobToDelete] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(createJobSchema),
    defaultValues: {
      title: "",
      skills: "",
      jobType: "full-time",
      salaryMin: 0,
      salaryMax: 0,
      experienceMin: 0,
      experienceMax: 0,
      openings: 1,
      jobCategory: "",
    },
  });

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const data: GetAllJobsResponse = await getAllJobs();
      setJobs(data.jobs);
      setError(null);
    } catch (err) {
      setError("Failed to load jobs.");
      toast.error("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const onSubmit = async (formData: FormData) => {
    try {
      const data = {
        title: formData.title,
        skills: formData.skills.split(',').map(skill => skill.trim()),
        jobType: formData.jobType,
        salary: {
          min: formData.salaryMin,
          max: formData.salaryMax,
        },
        experience: {
          min: formData.experienceMin,
          max: formData.experienceMax,
        },
        openings: formData.openings,
        jobCategory: formData.jobCategory,
      };

      if (editingJob) {
        await updateJob(editingJob._id, data);
        toast.success("Job Updated Successfully");
      } else {
        await createJob(data);
        toast.success("Job Created Successfully");
      }
      setOpen(false);
      reset();
      setEditingJob(null);
      await fetchJobs();
    } catch (error: any) {
      toast.error(error.message || "Failed to save job");
    }
  };

  const handleDeleteClick = (jobId: string) => {
    setJobToDelete(jobId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteJob = async () => {
    if (!jobToDelete) return;

    setIsDeleting(jobToDelete);
    try {
      await deleteJob(jobToDelete);
      toast.success("Job Deleted Successfully");
      setJobs(prevJobs => prevJobs.filter(job => job._id !== jobToDelete));
    } catch (error: any) {
      toast.error(error.message || "Failed to delete job");
    } finally {
      setIsDeleting(null);
      setJobToDelete(null);
      setDeleteDialogOpen(false);
    }
  };

  const handleEditJob = (job: Job) => {
    setEditingJob(job);
    setValue("title", job.title);
    setValue("skills", job.skills.join(", "));
    setValue("jobType", job.jobType);
    setValue("salaryMin", job.salary.min);
    setValue("salaryMax", job.salary.max);
    setValue("experienceMin", job.experience.min);
    setValue("experienceMax", job.experience.max);
    setValue("openings", job.openings);
    setValue("jobCategory", job.jobCategory);
    setOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-4">
        
        <RecruiterProfileDialog />

        <div className="flex justify-end mb-4">
          <Dialog open={open} onOpenChange={(open) => {
            if (!open) {
              setEditingJob(null);
              reset();
            }
            setOpen(open);
          }}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 text-white hover:bg-blue-700">
                {editingJob ? "Edit Job" : "Create Job"}
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[500px] w-full">
              <DialogHeader>
                <DialogTitle>{editingJob ? "Edit Job" : "Create New Job"}</DialogTitle>
              </DialogHeader>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
                <div>
                  <Label>Title</Label>
                  <Input placeholder="Job title" {...register("title")} />
                  {errors.title && (
                    <p className="text-red-500 text-sm">{errors.title.message}</p>
                  )}
                </div>

                <div>
                  <Label>Skills</Label>
                  <Textarea
                    placeholder="skills"
                    {...register("skills")}
                  />
                  {errors.skills && (
                    <p className="text-red-500 text-sm">{errors.skills.message}</p>
                  )}
                </div>

                <div>
                  <Label>Job Type</Label>
                  <select
                    className="w-full border rounded px-3 py-2"
                    {...register("jobType")}
                  >
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="internship">Internship</option>
                    <option value="remote">Remote</option>
                  </select>
                  {errors.jobType && (
                    <p className="text-red-500 text-sm">{errors.jobType.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Min Salary (LPA)</Label>
                    <Input
                      type="number"
                      {...register("salaryMin", { valueAsNumber: true })}
                    />
                    {errors.salaryMin && (
                      <p className="text-red-500 text-sm">{errors.salaryMin.message}</p>
                    )}
                  </div>
                  <div>
                    <Label>Max Salary (LPA)</Label>
                    <Input
                      type="number"
                      {...register("salaryMax", { valueAsNumber: true })}
                    />
                    {errors.salaryMax && (
                      <p className="text-red-500 text-sm">{errors.salaryMax.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Min Experience (years)</Label>
                    <Input
                      type="number"
                      {...register("experienceMin", { valueAsNumber: true })}
                    />
                    {errors.experienceMin && (
                      <p className="text-red-500 text-sm">{errors.experienceMin.message}</p>
                    )}
                  </div>
                  <div>
                    <Label>Max Experience (years)</Label>
                    <Input
                      type="number"
                      {...register("experienceMax", { valueAsNumber: true })}
                    />
                    {errors.experienceMax && (
                      <p className="text-red-500 text-sm">{errors.experienceMax.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label>Openings</Label>
                  <Input
                    type="number"
                    min={1}
                    {...register("openings", { valueAsNumber: true })}
                  />
                  {errors.openings && (
                    <p className="text-red-500 text-sm">{errors.openings.message}</p>
                  )}
                </div>

                <div>
                  <Label>Job Category</Label>
                  <select
                    className="w-full border rounded px-3 py-2"
                    {...register("jobCategory")}
                  >
                    <option value="">Select a category</option>
                    {jobCategories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  {errors.jobCategory && (
                    <p className="text-red-500 text-sm">{errors.jobCategory.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  {isSubmitting
                    ? "Saving..."
                    : editingJob
                      ? "Update Job"
                      : "Post Job"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {loading && !isDeleting && (
          <div className="flex justify-center items-center">
            <ClipLoader size={50} color="#0000ff" />
          </div>
        )}

        {jobs.length === 0 && !loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="text-center max-w-md">
              <h3 className="text-2xl font-semibold text-gray-700 mb-4">No Jobs Posted Yet</h3>
              <p className="text-gray-500 mb-6">
                You haven't created any job postings yet. Click the "Create Job" button to post your first job opportunity.
              </p>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 text-white hover:bg-blue-700">
                    Create Your First Job
                  </Button>
                </DialogTrigger>
              </Dialog>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-white shadow-lg rounded-2xl p-4 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="font-bold text-xl text-gray-800">{job.title}</h2>
                    <p className="text-blue-600 font-medium">{job.jobCategory}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${job.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}>
                    {job.isActive ? "Active" : "Inactive"}
                  </span>
                </div>

                <div className="mt-4 space-y-2">
                  <div>
                    <span className="font-semibold">Type:</span>{" "}
                    <span className="capitalize">{job.jobType.replace("-", " ")}</span>
                  </div>

                  <div>
                    <span className="font-semibold">Salary:</span>{" "}
                    <span>{job.salary.min} - {job.salary.max} LPA</span>
                  </div>

                  <div>
                    <span className="font-semibold">Experience:</span>{" "}
                    <span>{job.experience.min} - {job.experience.max} years</span>
                  </div>

                  <div>
                    <span className="font-semibold">Openings:</span>{" "}
                    <span>{job.openings}</span>
                  </div>

                  <div>
                    <span className="font-semibold">Skills:</span>{" "}
                    <div className="flex flex-wrap gap-1 mt-1">
                      {job.skills.map((skill, index) => (
                        <span key={index} className="bg-gray-100 px-2 py-1 rounded text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <span className="font-semibold">Company:</span>{" "}
                    <span>{job.recruiterProfile?.companyName}</span>
                  </div>

                  <div>
                    <span className="font-semibold">Location:</span>{" "}
                    <span>{job.recruiterProfile?.companyLocation}</span>
                  </div>
                </div>

                <div className="mt-4 flex justify-between">
                  <Button
                    onClick={() => handleEditJob(job)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white"
                    size="sm"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDeleteClick(job._id)}
                    className="bg-red-500 hover:bg-red-600 text-white"
                    size="sm"
                    disabled={isDeleting === job._id}
                  >
                    {isDeleting === job._id ? (
                      <ClipLoader size={20} color="#ffffff" />
                    ) : (
                      "Delete"
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete the job posting.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setDeleteDialogOpen(false)}
                disabled={!!isDeleting}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDeleteJob}
                disabled={!!isDeleting}
              >
                {isDeleting ? (
                  <ClipLoader size={20} color="#ffffff" />
                ) : (
                  "Delete"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default DashboardForRecruiter;