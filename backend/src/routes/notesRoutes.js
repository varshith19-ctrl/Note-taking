import express from "express"
import upload from "../middleware/multer.middleware.js" 
const router=express.Router()
import { notetaking ,getNotes, updateNotes, deleteNotes,getNoteById,AI_suggestions } from "../controllers/notetaking.controller.js"
router.post("/predict",AI_suggestions)
router.get("/",getNotes)
router.post("/",upload.single("media"),notetaking)
router.put("/:id",updateNotes)
router.delete("/:id",deleteNotes)
router.get("/:id", getNoteById)

export  default router
