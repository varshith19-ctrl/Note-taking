import mongoose from "mongoose";

const noteSchema=new mongoose.Schema({
    title:{
        type:string,
        required:true
    },
    description:{
        type:string,
        required:true
    }
},{timestamps:true})
const note =mongoose.model("note",noteSchema)
export default note  