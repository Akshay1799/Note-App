// pages/Notes.jsx

import { useState, useEffect } from 'react'
import { getNotes, createNote, deleteNote } from '../api/notes'

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("")


  useEffect(() => {
    fetchNotes();
  }, [])


  const fetchNotes = async () => {
    try {
      setLoading(true);
      const data = await getNotes();
      setNotes(data.notes || [])
    } catch (error) {
      setError("Failed to load notes");
    } finally {
      setLoading(false)
    }
  }

  const handleCreateNote = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) return;

    try {
      const data = await createNote({ title, content });
      setNotes((prev) => [data.note, ...prev]);
      setTitle("");
      setContent("")
    } catch (error) {
      setError('Failed to create note')
    }
  }

  const handleDeleteNote = async (id) => {
    try {
      await deleteNote(id);
      setNotes((prev) => prev.filter((note) => note._id !== id));
    } catch (error) {
      setError('Failed to delete note')
    }
  }

  if (loading) {
    return <p className='text-center mt-8'>Loading notes...</p>
  }

  return (
    <div className='max-w-xl mx-auto mt-6 flex flex-col justify-center items-center'>

      <h2 className='text-2xl font-bold mb-8'>My Notes</h2>
      {error && <p className='text-red-500 mb-3'>{error}</p>}

      <form onSubmit={handleCreateNote} className='flex justify-between gap-2 mb-4 '>    
        <div className='flex flex-col rounded shadow-md'>
          <input value={title} onChange={(e) => setTitle(e.target.value)}
            type="text" placeholder='Title'
            className="flex-1 px-3 py-2 outline-none border-b border-gray-300 font-semibold"
          />
          <textarea
            placeholder="Content..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className=" px-3 py-2 outline-none min-h-20 max-h-100"
            rows="3"
          />
        </div>
        <div>
          <button className='px-4 py-2 bg-blue-500 text-white rounded-full hover:cursor-pointer hover:bg-blue-600 hover:duration-200'><span className='text-shadow-md font-bold'>Add +</span></button>
        </div>
      </form>

      {notes.length === 0 && (
        <p className='text-gray-500'>No notes yet. Create one!</p>
      )}

      <ul className='space-y-2 '>
        {notes.map((note) => (
          <li key={note._id} className='flex justify-between items-center border p-3 rounded'>
            <div className='flex flex-col'>
              <span className='font-semibold'>{note.title}</span>
              <span className='text-gray-800'>{note.content}</span>
            </div>
            <button onClick={() => handleDeleteNote(note._id)} className=' px-4 py-2 bg-red-500 hover:bg-red-600 hover:cursor-pointer rounded text-white text-shadow-lg font-semibold ml-4'>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Notes