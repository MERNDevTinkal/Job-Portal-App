import  express  from 'express';
import {createRecruiterProfile} from ".././controllers/userController/Recruiter/RecruiterProfile.js";
import isAuthenticated from "../middlewares/isUserAuthenticated.js";
import { verifyRecruiter } from "./../middlewares/verifyRecruiter.js";
import { verifyjobseeker } from '../middlewares/verifyjobseeker.js';
import { createJobSeekerProfile } from '../controllers/userController/jobseeker/jobseekerProjile.js';
import { getJobSeekerProfile } from '../controllers/userController/jobseeker/getJobSeekerProfile.js';
import { updateJobSeekerProfile } from '../controllers/userController/jobseeker/updateJobSeekerProfile.js';
import { getRecruiterProfile } from '../controllers/userController/Recruiter/getRecruiterProfile.js';
import { updateRecruiterProfile } from '../controllers/userController/Recruiter/updateRecruiterProfile.js';

 const router = express.Router();

// Job Seeker Routes
router.post("/jobseeker", isAuthenticated, verifyjobseeker, createJobSeekerProfile);
router.get("/jobseeker", isAuthenticated, verifyjobseeker, getJobSeekerProfile);
router.put("/jobseeker", isAuthenticated, verifyjobseeker, updateJobSeekerProfile);

// Recruiter Routes
router.post("/recruiter", isAuthenticated , verifyRecruiter, createRecruiterProfile);
router.get("/recruiter", isAuthenticated, verifyRecruiter, getRecruiterProfile);
router.put("/recruiter",isAuthenticated,verifyRecruiter,updateRecruiterProfile)


export default router;
