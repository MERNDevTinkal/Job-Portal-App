import express from "express"
import { applyJob } from "../controllers/applicationController/applyJob.js";
import isAuthenticated from "../middlewares/isUserAuthenticated.js";
import { verifyjobseeker } from "../middlewares/verifyjobseeker.js";
import { updatejobStatus } from './../controllers/applicationController/status.js';
import { verifyRecruiter } from "../middlewares/verifyRecruiter.js";

const router = express.Router();

router.post("/:jobId",isAuthenticated,verifyjobseeker,applyJob);

router.put("/:applicationID",isAuthenticated,verifyRecruiter,updatejobStatus)

export default router;