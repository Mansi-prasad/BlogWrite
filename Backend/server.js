import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import postRouter from "./routes/postRouter.js";
import userRouter from "./routes/userRoute.js";
import "dotenv/config";
//app config
const app = express();
const port = process.env.PORT || 4000;
//middleware
app.use(express.json()); // middleware, allows server to parse incoming JSON request bodies.
app.use(cors()); //  the cors middleware to allow all cross-origin requests.

//DB Connection
connectDB();

app.use("/uploads", express.static("uploads"));

//API endpoints
app.use("/api/post", postRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
