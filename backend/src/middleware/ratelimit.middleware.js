import ratelimit from "../configuration/ratelimiter.js";
export const ratelimiter=async(req,res,next)=>{
try {
    const{success}=await ratelimit.limit("my-rate-limit")
if(!success){
    return res.json({message:"too many requests"})
}
next()
} catch (error) {
    console.log(`error has occured while ratelimiting is going on ${error}`);
    res.json({message:"internal server error"})
next(error)
}

}