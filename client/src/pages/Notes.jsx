// pages/Notes.jsx

import { useState, useEffect } from 'react'
import { getNotes, createNote, deleteNote } from '../api/notes'
import { MdDeleteOutline } from "react-icons/md";
import { PiNotePencilBold } from "react-icons/pi";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("")
  const [isFormOpen, setIsFormOpen] = useState(false)


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

    if (!title.trim()) return;

    try {
      const data = await createNote({ title, content });
      setNotes((prev) => [data.note, ...prev]);
      setTitle("");
      setContent("")
      setIsFormOpen(false);
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
    <div className=' max-w-4xl mx-auto mt-6 flex flex-col justify-center items-center px-4'>

      <h2 className='text-2xl font-bold my-6'>My Notes</h2>
      {error && <p className='text-red-500 mb-3'>{error}</p>}

      {!isFormOpen && (
        <div title='Create new' className='w-full flex justify-start my-6 '>
          <PiNotePencilBold onClick={()=>setIsFormOpen(true)} className=' text-4xl hover:cursor-pointer hover:text-blue-400 hover:duration-150'/>
        </div>

      )}

      {isFormOpen && (
        <form onSubmit={handleCreateNote} className='flex justify-between gap-2 mb-4 '>    
          <div className='flex flex-col gap-2'>
            <input value={title} onChange={(e) => setTitle(e.target.value)}
              type="text" placeholder='Title'
              className=" px-3 py-2 outline-none border border-blue-300 rounded-2xl font-semibold "
            />
            <textarea
              placeholder="Content..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className=" px-3 py-2 outline-none border border-blue-300 rounded-2xl min-h-20 max-h-100"
              rows="3"
            />
          </div>
          <div >
            <button className=' mr-2 px-4 py-2 bg-blue-500 text-white rounded-full hover:cursor-pointer hover:bg-blue-600 hover:duration-200'><span className='text-shadow-md font-bold'>Add +</span></button>
            <button type="button" onClick={() => setIsFormOpen(false)} className='px-4 py-2 bg-gray-400 text-white rounded-full hover:bg-gray-500 hover:cursor-pointer'>Cancel</button>
          </div>
        </form>

      )}
      

      {notes.length === 0 && (
        <p className='text-gray-500 text-xl font-semibold'>No notes yet. Create one!</p>
      )}

      <ul className='space-y-2 flex gap-3 flex-wrap mt-6'>
        {notes.map((note) => (
          <li key={note._id} className='relative flex justify-between  bg-amber-50 p-3 border border-amber-200 hover:border-blue-200 rounded-2xl hover:shadow-lg w-64 h-40 overflow-hidden'>
            <div className='flex flex-col -top-2 mx-2 gap-y-2 '>
              <span className='font-semibold text-xl tracking-wider'>{note.title}</span>
              <span className='text-gray-800 tracking-wider mr-1'>{note.content}</span>
            </div>
            <div className='w-fit'>
              <button onClick={() => handleDeleteNote(note._id)} title='Delete' className='absolute -right-2 top-0 px-4 py-2 text-black hover:text-red-500 hover:duration-150 text-2xl hover:cursor-pointer font-semibold ml-4'><MdDeleteOutline/></button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Notes