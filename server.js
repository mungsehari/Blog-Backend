import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
import blogRouter from "./routes/blogRoutes.js";

//env config
dotenv.config();

//mogo config
connectDB();

//rest objects
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
//routes
app.use("/api/user", userRouter);
app.use("/api/blog", blogRouter);

app.get("/", (req, res) => {
  res.status(200).send({
    message: "Welcome to the API!",
  });
});

const PORT = process.env.PORT || 8585;
const DEV_MODE = process.env.DEV_MODE;
app.listen(PORT, () => {
  console.log(`Server is running on ${DEV_MODE} mode port no ${PORT}`);
});
