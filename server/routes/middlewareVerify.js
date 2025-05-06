import  express  from "express";
import { verify } from "../middlewares/verifyLogin.js";

const router = express.Router();

router.get("/verifyLogin", verify);

export default router;
