// notes.controller.js
import mongoose from "mongoose";
import Note from "../models/notes.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { AppError } from "../utils/AppError.js";


export const createNote = asyncHandler(async (req, res) => {
  
    const { title, content } = req.body;

    if (!title)
      return next(new AppError("Title is required"))

    const note = await Note.create({
      title,
      content: content || "",
      owner: req.user._id,
    });

    return res.status(201).json({ status: "success", note });
  
});

export const getMyNotes = asyncHandler(async (req, res, next) => {
  
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const q = req.query.q || '';
    const sortBy = req.query.sortBy || 'createdAt';
    const order = req.query.order === 'asc'? 1 : -1

    const skip = (page - 1) * limit;

    const filter = {owner: req.user._id};

    if(q){
      filter.$or = [
        {title: {$regex:q, $options:'i'}},
        {content: {$regex:q, $options:'i'}}
      ]
    }

    const sort = {[sortBy]:order}

    const notes = await Note.find(filter).sort(sort).skip(skip).limit(limit);
    
    const total = await Note.countDocuments(filter);
    const totalPages = Math.ceil(total/limit);


    return res.status(200).json({ 
      status: "Success", 
      results: notes.length,
      page, 
      limit,
      total,
      totalPages,
      notes
     });
  
});

export const getNoteById = asyncHandler(async (req, res, next) => {
 
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
      return next(new AppError('Invalid ID', 400))
    }

    const note = await Note.findOne({_id:id, owner:req.user._id});
    if(!note)return next(new AppError('Note not found', 404))
    
    return res.status(200).json({status:'Success', note});

  
});

export const updateNote = asyncHandler(async (req, res, next) => {

        const {id} = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)){
          return next(new AppError('Invalid ID', 400))
        }

        const note = await Note.findOne({_id:id, owner:req.user._id});
        if(!note)return next(new AppError('Note not found', 404));

        note.title = req.body.title ?? note.title;
        note.content = req.body.content ?? note.content;

        await note.save();

        return res.status(200).json({status:'Note updated succesfully', note})
  
});

export const deleteNote = asyncHandler(async (req, res, next) => {

        const {id} = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)){
          return next(new AppError('Invalid ID', 400))
        }

        const note = await Note.findOne({_id:id, owner:req.user._id});
        if(!note) return next(new AppError('Note not found', 404))

        await note.deleteOne();

        return res.status(200).json({status:'Note deleted succesfully'})
  
});
