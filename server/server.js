import express from "express"
import dotenv from "dotenv"
import connectDB from "./DB/dbConfig.js";
import bodyParser  from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors"
import allRoutes from "./routes/router.js";

const app = express()

dotenv.config();
connectDB();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));
app.use(cors({
    origin: process.env.FRONTEND_URL, 
    credentials: true,
  }));

allRoutes(app);

app.get("/",(req,res)=>{
    res.send("Hello from server");
})

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
});