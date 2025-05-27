import express from "express"
const router=express.Router()
import { notetaking ,getNotes, updateNotes, deleteNotes } from "../controllers/notetaking.controller.js"
router.get("/",getNotes)
router.post("/notetaking",notetaking)
router.put("/update/:id",updateNotes)
router.delete("/delete/:id",deleteNotes)
export  {router as notesRoutes}
