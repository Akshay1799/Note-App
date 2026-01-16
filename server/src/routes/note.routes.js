// notes.routes.js
import express from'express';
import { protect } from '../middlewares/auth.midleware.js';
import { createNote, deleteNote, getMyNotes, getNoteById, updateNote } from '../controllers/note.controller.js';

const router = express.Router();

router.use(protect)

router.post('/', createNote)
router.get('/', getMyNotes)

router.route('/:id')
.get(getNoteById)
.patch(updateNote)
.delete(deleteNote)

export default router;