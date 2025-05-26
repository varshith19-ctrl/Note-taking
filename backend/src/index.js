import express from "express";
import { notesRoutes } from "./routes/notesRoutes.js";
import { connectDB } from "./configuration/connectDb.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();
// console.log(app);cl

app.use(express.json());
app.use("/api/homepage", notesRoutes);
app.listen(process.env.PORT, () => {
  console.log(`server is listening on port ${process.env.PORT}`);
connectDB();  
});
