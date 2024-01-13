import express from "express"
import cors from "cors"
import "dotenv/config"
import mongoose from "mongoose"

mongoose.connect(process.env.MONGO_URI as string)

const app = express()
app.use(express.json()) //converts the body of api requests into json
app.use(express.urlencoded({extended: true})) //parse the url to get parameters
app.use(cors()) // prevents certain requests from certain urls

app.listen(7000, function() {
    console.log("Server started on port:7000")
})