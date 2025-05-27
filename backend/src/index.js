import express from "express";
import { notesRoutes } from "./routes/notesRoutes.js";
import { connectDB } from "./configuration/connectDb.js";
import dotenv from "dotenv";
import ratelimit from "./configuration/ratelimiter.js";
import { ratelimiter } from "./middleware/ratelimit.middleware.js";
dotenv.config();
const app = express();
// console.log(app);cl

app.use(express.json());
app.use(ratelimiter)
app.use("/api/homepage", notesRoutes);
// app.use((req,res,next)=>{
//   console.log("middleware test ");
//   next()
// })

connectDB().then(()=>{
app.listen(process.env.PORT, () => {
  console.log(`server is listening on port ${process.env.PORT}`);

});
})  

