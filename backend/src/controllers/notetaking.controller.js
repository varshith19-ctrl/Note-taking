import note from "../model/notes.model.js"
export const notetaking =async (req,res)=>{
const{title,content}=req.body
try{ const Note=await note.create({
    title,
    content,
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
    const{title,content}=req.body
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
//todo:find one specific note using id 