import express, { Request, Response } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import "dotenv/config"
import mongoose from "mongoose"

import authRoutes from "./routes/auth"
import userRoutes from "./routes/users"
import myhotelRoutes from "./routes/my-hotels"
import path from "path"
import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

mongoose.connect(process.env.MONGO_URI as string)

const app = express()
app.use(cookieParser())
app.use(express.json()) //converts the body of api requests into json
app.use(express.urlencoded({ extended: true })) //parse the url to get parameters
app.use(cors({
    origin: process.env.FRONT_END_URL,
    credentials: true
})) // prevents certain requests from certain urls

app.use(express.static(path.join(__dirname, "../../frontend/dist")))

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/my-hotels", myhotelRoutes)

app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"))
})

app.listen(7000, function () {
    console.log("Server started on port:7000")
})