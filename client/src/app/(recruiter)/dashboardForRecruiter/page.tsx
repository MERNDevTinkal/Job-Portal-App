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
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createJob } from "@/actions/recruiter/createJobs";
import { updateJob } from "@/actions/recruiter/editJob";
import { getAllJobs } from "@/actions/recruiter/getAllJobs";
import { deleteJob } from "@/actions/recruiter/deleteJob";
import Navbar from "@/components/RecruiterComponents/Navbar";
import ProfileManager from "../ProfileManager/page";

type FormData = z.infer<typeof createJobSchema>;

const DashboardForRecruiter = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);

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
      description: "",
      jobType: "full-time",
      salary: "",
      openings: 1,
    },
  });

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const data: GetAllJobsResponse = await getAllJobs();
      setJobs(data.jobs);
    } catch (err) {
      setError("Failed to load jobs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const onSubmit = async (data: FormData) => {
    try {
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
      fetchJobs();
    } catch (error: any) {
      toast.error(error.message || "Failed to save job");
    }
  };

  const handleDeleteJob = async (jobId: string) => {
    try {
      await deleteJob(jobId);
      toast.success("Job Deleted Successfully");
      fetchJobs();
    } catch (error: any) {
      toast.error(error.message || "Failed to delete job");
    }
  };

  const handleEditJob = (job: Job) => {
    setEditingJob(job);
    setValue("title", job.title);
    setValue("description", job.description);
    setValue("jobType", job.jobType);
    setValue("salary", job.salary);
    setValue("openings", job.openings);
    setOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      
      
      <div className="p-4">
          <ProfileManager />
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
          <Label>Description</Label>
          <Textarea
            placeholder="Job responsibilities..."
            {...register("description")}
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
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

        <div>
          <Label>Salary</Label>
          <Input placeholder="Salary" {...register("salary")} />
          {errors.salary && (
            <p className="text-red-500 text-sm">{errors.salary.message}</p>
          )}
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


        {loading && (
          <div className="flex justify-center items-center">
            <ClipLoader size={50} color="#0000ff" />
          </div>
        )}

        {error && toast.error(error)}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white shadow-lg rounded-2xl p-4 hover:shadow-xl"
            >
              <h2 className="font-semibold text-xl">{job.title}</h2>
              <p className="text-gray-600 mt-1">{job.description}</p>
              <div className="mt-3 text-sm text-gray-700">
                <p>
                  Type: <span className="font-medium">{job.jobType}</span>
                </p>
                <p>
                  Salary: <span className="font-medium">{job.salary}</span>
                </p>
                <p>
                  Openings: <span className="font-medium">{job.openings}</span>
                </p>
                <p>
                  Company:{" "}
                  <span className="font-medium">
                    {job.recruiterProfile?.companyName}
                  </span>
                </p>
                <p>
                  Location:{" "}
                  <span className="font-medium">
                    {job.recruiterProfile?.companyLocation}
                  </span>
                </p>
              </div>
              <div className="mt-4 flex justify-between text-sm">
                <span className="text-gray-600">
                  Recruiter: {job.recruiter.name}
                </span>
                <span className={job.isActive ? "text-green-500" : "text-red-500"}>
                  {job.isActive ? "Active" : "Inactive"}
                </span>
              </div>
              <div className="mt-4 flex justify-between">
                <Button
                  onClick={() => handleEditJob(job)}
                  className="bg-yellow-500 text-white"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDeleteJob(job._id)}
                  className="bg-red-500 text-white"
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardForRecruiter;