// notes.model.js
import mongoose from "mongoose";

export const noteSchema = new mongoose.Schema({
    title:{type:String, trim:true, required:true},
    content:{type:String, default:''},
    owner:{type:mongoose.Schema.Types.ObjectId, ref: 'User', required:true}
}, {timestamps:true})

const Note = mongoose.model('Notes', noteSchema);

export default Note;