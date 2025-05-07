import  express  from 'express';
import {createRecruiterProfile} from ".././controllers/userController/Recruiter/RecruiterProfile.js";
import isAuthenticated from "../middlewares/isUserAuthenticated.js";
import { verifyRecruiter } from "./../middlewares/verifyRecruiter.js";
import { verifyjobseeker } from '../middlewares/verifyjobseeker.js';
import { createJobSeekerProfile } from '../controllers/userController/jobseeker/jobseekerProjile.js';

 const router = express.Router();

router.post("/recruiter",isAuthenticated, verifyRecruiter, createRecruiterProfile);
router.post("/jobseeker",isAuthenticated, verifyjobseeker, createJobSeekerProfile);

export default router;
