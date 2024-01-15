import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import "dotenv/config"
import mongoose from "mongoose"

import userRoutes from "./routes/users"
import authRoutes from "./routes/auth"

mongoose.connect(process.env.MONGO_URI as string)

const app = express()
app.use(cookieParser())
app.use(express.json()) //converts the body of api requests into json
app.use(express.urlencoded({extended: true})) //parse the url to get parameters
app.use(cors({
    origin: process.env.FRONT_END_URL,
    credentials: true
})) // prevents certain requests from certain urls

app.use("/api/users", userRoutes)
app.use("/api/auth", authRoutes)

app.listen(7000, function() {
    console.log("Server started on port:7000")
})