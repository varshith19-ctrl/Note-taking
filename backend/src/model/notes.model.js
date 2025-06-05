import mongoose from "mongoose";

const noteSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    media:{
        type:String
    }
},{timestamps:true})
const note =mongoose.model("note",noteSchema)
export default note  