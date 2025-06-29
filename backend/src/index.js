import express from "express";
import  notesRoutes  from "./routes/notesRoutes.js";
import { connectDB } from "./configuration/connectDb.js";
import dotenv from "dotenv";
import cors from "cors";
import ratelimit from "./configuration/ratelimiter.js";
import { ratelimiter } from "./middleware/ratelimit.middleware.js";
import path from "path";  
dotenv.config();
import { fileURLToPath } from 'url';
const app = express();
// console.log(app);cl
const PORT = process.env.PORT || 5001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}
 // Serve uploaded media files

app.use(express.json()); 
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use(ratelimiter)
app.use("/api/notes", notesRoutes);
// app.use((req,res,next)=>{
//   console.log("middleware test ");
//   next()
// })
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

connectDB().then(()=>{
app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);

});
})  

