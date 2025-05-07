import express from "express"
import { register } from "../controllers/authController/register.js";
import { VerifyEmail } from "../controllers/authController/verifyEmail.js";
import {login} from "../controllers/authController/login.js"
import { logout } from "../controllers/authController/logout.js";
import {forgotPassword} from "../controllers/authController/forgotPassword.js"
import {resetPassword} from "../controllers/authController/reserPassword.js"
import { verify } from "../controllers/authController/verifyLogin.js";

 const router = express.Router();

 router.post("/",register)
 router.post("/verify-email",VerifyEmail)
 router.post("/login",login);
 router.post("/logout",logout);
 router.post("/forgotPassword",forgotPassword);
 router.post("/resetPassword",resetPassword);
 router.get("/verifyLogin",verify);



 export default router;