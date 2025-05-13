import express from "express";
import { createJob } from "../controllers/jobController/createJob.js";
import isAuthenticated from "../middlewares/isUserAuthenticated.js";
import { verifyRecruiter } from "../middlewares/verifyRecruiter.js";
import { getAllJobs } from "../controllers/jobController/getAllJobs.js";
import { updateJob } from "../controllers/jobController/updateJob.js";
import { deleteJob } from "../controllers/jobController/deleteJob.js";
import { verifyRecruiterProfileExists } from "../middlewares/verifyRecruiterProfileExists.js";

const router = express.Router();

router.post(
  "/",
  isAuthenticated,
  verifyRecruiter,
  verifyRecruiterProfileExists,
  createJob
);
router.get("/", isAuthenticated, getAllJobs);
router.put("/:jobId", isAuthenticated, verifyRecruiter,verifyRecruiterProfileExists, updateJob);
router.delete("/:jobId", isAuthenticated, verifyRecruiter,verifyRecruiterProfileExists, deleteJob);

export default router;
