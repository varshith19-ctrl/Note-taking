import express from "express"
const router=express.Router()
router.get("/",(req,res)=>{
res.json("testing the modular structure")
})

export  {router as notesRoutes}
