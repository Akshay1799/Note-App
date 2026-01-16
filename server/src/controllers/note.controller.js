// notes.controller.js

import Note from "../models/notes.model.js";

export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title)
      return res.status(400).json({ error: "title is required" });

    const note = await Note.create({
      title,
      content: content || "",
      owner: req.user._id,
    });

    return res.status(201).json({ status: "success", note });
  } catch (error) {
    console.log(`Something went wrong: ${error.message}`);
  }
};

export const getMyNotes = async (req, res) => {
  try {
    const notes = await Note.find({ owner: req.user._id }).sort({
      createdAt: -1,
    });

    // if (!notes) return res.status(404).json({ message: "Notes are empty!" });

    return res.status(200).json({ status: "Success", notes });
  } catch (error) {
    console.log(error.message);
  }
};

export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if(!note)return res.status(404).json({error:'Note not found'})
    
    if(note.owner.toString() !== req.user._id.toString()){
        return res.status(403).json({error:'Forbidden'})
    }

    return res.status(200).json({status:'Success', note});

  } catch (error) {
    return res.status(500).json({ error: "Server error" });
    
  }
};

export const updateNote = async (req, res) => {
  try {
        const note = await Note.findById(req.params.id);
        if(!note)return res.status(404).json({error:'Note not found'});

        if(note.owner.toString() !== req.user._id.toString()){
            return res.status(403).json({error:'Forbidden'})
        }

        note.title = req.body.title ?? note.title;
        note.content = req.body.content ?? note.content;

        await note.save();

        return res.status(200).json({status:'Note updated succesfully', note})
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};

export const deleteNote = async (req, res) => {
  try {
        const note = await Note.findById(req.params.id);
        if(!note) return res.status(404).json({error:'Note not found'});

        if(note.owner.toString() !== req.user._id.toString()){
            return res.status(403).json({error:'Forbidden'})
        }

        await note.deleteOne();

        return res.status(200).json({status:'Note deleted succesfully'})
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};
