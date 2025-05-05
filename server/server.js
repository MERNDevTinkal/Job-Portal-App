import express from "express"
import dotenv from "dotenv"
import connectDB from "./DB/dbConfig.js";
import bodyParser  from "body-parser";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors"

const app = express()

dotenv.config();
connectDB();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:3000", 
    credentials: true,
  }));

//app.use("/api/v1/auth")



app.get("/",(req,res)=>{
    res.send("Hello from server");
})

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
});