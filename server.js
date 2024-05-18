import express from "express"
import mongoose from "./config/database.js"
import session from "express-session"
import sessionConfig from "./config/session.js"
import "dotenv/config"
import {
  handleErrorStatus,
  handleMongooseErrors,
  handleUnexpectedErrors,
} from "./api/v1/middleware/errorMiddleware.js"
import authRoute from "./api/v1/routes/authRoutes.js"
import productRoute from "./api/v1/routes/productRoutes.js"
import userRoute from "./api/v1/routes/userRoutes.js"

const app = express()
const PORT = process.env.SERVER_PORT || 8080

// Middleware
app.use(session(sessionConfig))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Routes
app.use("/api/v1/auth", authRoute)
app.use("/api/v1", productRoute)
app.use("/api/v1", userRoute)

app.get("/", (req, res) => {
  res.send("Hello World!")
})

// Error handling middleware
app.use(handleMongooseErrors)
app.use(handleErrorStatus)
app.use(handleUnexpectedErrors)

// Start server
app.listen(PORT, () => {
  console.log("Server is running at port 3000")
})