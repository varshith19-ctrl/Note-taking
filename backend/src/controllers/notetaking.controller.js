import note from "../model/notes.model.js"
import fetch from "node-fetch"
; // replace with your chosen model

import dotenv from "dotenv"
dotenv.config()

const API_KEY = process.env.HUGGINGFACE_AI_SECRET_KEY;
console.log(API_KEY);

const HUGGINGFACE_API_URL = "https://api-inference.huggingface.co/models/EleutherAI/gpt-2";
export const notetaking =async (req,res)=>{
const{title,content}=req.body
 const mediaPath = req.file ? `/uploads/${req.file.filename}` : "";
try{ const Note=await note.create({
    title,
    content,
    media:mediaPath,
})
if(!Note){
    res.json({"message":"input is wrong formatted"})
}
res.status(200).json(Note)}catch(error){
    console.log(`error in uploading the note${error}`);
    res.status(500).json({"message":"internal server error "})
}
}
export const getNotes=async(req,res)=>{
    try {
        const notes=await note.find()

        res.status(200).json(notes)
        
    } catch (error) {
        console.log(`there was an error while fetching the notes ${error}`);
        res.status(500).json({"message":"internal server error"})
    }
    
}
export const updateNotes=async(req,res)=>{
     const{title,content}=req.body
    
    try {
       const updateNote=await note.findByIdAndUpdate(req.params.id,{title,content})
if(!updateNote){
    res.status(400).json({message:"note not found"})
}

res.status(200).json(updateNote)
    } catch (error) {
        console.log(`there was some problem while updating notes ${error}`);
        res.status(500).json({"message":"internal server error"})
    }
}
export const deleteNotes=async(req,res)=>{
    
    try {
        const deleteNote=await note.findByIdAndDelete(req.params.id)
        if(!deleteNote){
            res.status(400).json({message:"note not found"})

        }
res.status(200).json(deleteNote)
    } catch (error) {
        console.log(`error occured while deleting the node ${error}`);
        res.status(500).json({message:"internal server error "})
    }
}
export async function getNoteById(req, res) {
  try {
    const notes = await note.findById(req.params.id);
    if (!notes) return res.status(404).json({ message: "Note not found!" });
    res.json(notes);
  } catch (error) {
    console.error("Error in getNoteById controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
export const AI_suggestions = async (req, res) => {
  const { prompt } = req.body;

  if (!prompt || prompt.trim() === "") {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const response = await fetch("https://api.cohere.ai/v1/generate", {
      method: "POST",
      headers: {
        Authorization: `Bearer a17MmpYMigIjuHdweuT9zVwaDyJY1KqsFNFuDAGU`, // or paste directly for testing
        "Content-Type": "application/json",
        "Cohere-Version": "2022-12-06" // Optional but recommended
      },
      body: JSON.stringify({
        model: "", // Or "command-light", or leave out to use default
        prompt,
        max_tokens: 50,
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data.message || "Cohere API error" });
    }

    const suggestion = data.generations?.[0]?.text?.trim() || "No suggestion generated.";
    res.status(200).json({ suggestion });
  } catch (error) {
    console.error("Cohere API error:", error);
    res.status(500).json({ error: "Failed to get suggestion from Cohere" });
  }
};
