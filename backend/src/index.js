import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.route.js"
import reportRoutes from "./routes/report.route.js"
import adminRoutes from "./routes/admin.route.js"
import userRoutes from "./routes/user.route.js"
import wasteRoutes from "./routes/waste.route.js"
import {connectDB} from "./lib/connect.js"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
// import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

dotenv.config()

// app.use(errorHandler)

app.use(cors(
    {
        origin : "http://localhost:5173",
        credentials : true,
    }
))

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT;

app.use('/api/auth',authRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/admin',adminRoutes);
app.use('/api/users', userRoutes);
app.use("/api/waste", wasteRoutes);



app.listen(PORT, () => {
    console.log(`Successfully running on port ${PORT}`);
    connectDB();
})