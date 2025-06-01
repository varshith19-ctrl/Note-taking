import express from "express"
const router=express.Router()
import { notetaking ,getNotes, updateNotes, deleteNotes,getNoteById } from "../controllers/notetaking.controller.js"
router.get("/",getNotes)
router.post("/",notetaking)
router.put("/:id",updateNotes)
router.delete("/:id",deleteNotes)
router.get("/:id", getNoteById);
export  default router
