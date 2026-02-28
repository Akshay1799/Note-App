// pages/Notes.jsx

import { useState, useEffect, useRef } from 'react'
import { getNotes, createNote, deleteNote, updateNote } from '../api/notes'
import { MdDeleteOutline, MdOutlineCancel,MdOutlineCheck  } from "react-icons/md";
import { PiNotePencilBold } from "react-icons/pi";
import { RiPencilFill } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(6);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [debounceSearch, setDebounceSearch] = useState(search);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  const abortControllerRef = useRef(null);
  const editInputRef = useRef(null);

  useEffect(() => {
    fetchNotes();
  }, [page, debounceSearch])

  useEffect(() => {


    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceSearch(search)
    }, 400);

    return () => clearTimeout(timer)

  }, [search])

   useEffect(() => {
    if (editingNoteId && editInputRef.current) {
      editInputRef.current.focus();
    }
  
  }, [editingNoteId])

  const fetchNotes = async () => {
    try {
      setLoading(true);

      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      const controller = new AbortController();
      abortControllerRef.current = controller;

      const data = await getNotes({
        page,
        limit,
        q: debounceSearch,
      },
        controller.signal
      );
      setNotes(data.notes || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      if (error.name !== "CanceledError" && error.name !== "AbortError") {
        setError("Failed to load notes");
      }
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
    const previousNotes = notes;

    setNotes(prev => prev.filter(note => note._id !== id));

    try {
      await deleteNote(id);
      fetchNotes();
    } catch (error) {
      setNotes(previousNotes)
      setError('Failed to delete note')
    }
  }

  const handleStartEdit = (note) => {
    setEditingNoteId(note._id);
    setEditTitle(note.title);
    setEditContent(note.content);
  }

  const handleCancelEdit = () => {
    setEditingNoteId(null);
    setEditTitle("");
    setEditContent("");
  }

  const handleSaveEdit = async (id) => {
    const previousNotes = notes;

    
 
    
    try {
      await updateNote(id, {
        title: editTitle,
        content: editContent
      })
      
      setNotes(prev => prev.map(note => note._id === id ? { ...note, title: editTitle, content: editContent } : note))
      setEditingNoteId(null);
      setEditTitle("");
      setEditContent("");
      // fetchNotes();
    } catch (error) {
      setNotes(previousNotes);
      setError("Failed to update note")
    }
  }

  if (loading) {
    return <p className='text-center mt-8'>Loading notes...</p>
  }

  return (
    <div className=' border-gray-100 border-l border-r max-w-275 mx-auto mt-6 flex flex-col justify-center items-center px-4'>

      {error && <p className='text-red-500 mb-3'>{error}</p>}

      {isFormOpen ? (
        <div title='Close' className='w-full flex justify-start mt-6 ml-33'>
          <MdOutlineCancel onClick={() => setIsFormOpen(false)} className=' text-4xl hover:cursor-pointer hover:duration-150 hover:text-gray-500' />
        </div>
      ) : (
        <div title='Create new' className='w-full flex justify-start mt-6 ml-33'>
          <PiNotePencilBold onClick={() => setIsFormOpen(true)} className=' text-4xl hover:cursor-pointer hover:text-blue-400 hover:duration-150' />
        </div>
      )}

      {isFormOpen && (
        <form onSubmit={handleCreateNote} className='flex justify-between gap-2 mb-8  w-xl '>
          <div className='flex flex-col gap-2 w-full'>
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
            <button className=' mr-2 px-4 py-2 bg-blue-500 text-white rounded-full hover:cursor-pointer hover:bg-blue-600 hover:duration-200'><span className='text-shadow-md font-bold'> +</span></button>
          </div>
        </form>

      )}

      {notes.length > 0 && (
        <div className='w-full flex justify-between items-center mt-4 ml-33'>
            <h2 className='text-3xl font-bold mt-6 -mb-1 w-full'>My Notes</h2>
          <div className='flex items-center mt-6 mr-33'>
            <input type="text" value={search} placeholder='Search notes...'
              onChange={(e) => {
                setPage(1);
                setSearch(e.target.value)
              }}
              className="shadow-md px-3 py-1 outline-none rounded-2xl border border-blue-200 text-gray-600 text-md w-64 max-w-full"
            />
          </div>
        </div>

      )}

      {notes.length === 0 && (
        <p className='text-gray-500 text-xl font-semibold mt-20  flex items-center'>No notes yet. Create one!</p>
      )}

      <ul className='space-y-2 flex gap-6 flex-wrap mt-14 justify-center'>
        {notes.map((note) => (
          <li key={note._id} className=' overflow-hidden relative flex justify-between  bg-amber-50 p-3 border border-amber-200 hover:border-blue-200 rounded-2xl hover:shadow-md w-74 h-50 transition-all duration-200 hover:scale-[0.98]'>
            
            {editingNoteId === note._id ?
              (
                <div className="flex flex-col gap-2 w-full">
                  <div className='flex justify-end gap-2 top-1 right-'>
                    <button onClick={()=>handleSaveEdit(note._id)} title='Save' className=" border border-slate-600 hover:scale-95 hover:cursor-pointer hover:border hover:border-green-400 hover:bg-gray-100  px-2 text-black py-1 rounded"><MdOutlineCheck /></button>
                    <button onClick={handleCancelEdit} title='Cancel' className="border border-slate-600 hover:scale-95 hover:cursor-pointer hover:border hover:border-red-400 hover:bg-gray-100   px-3 py-1 rounded"><RxCross2/></button>
                  </div>
                  <input onKeyDown={(e)=>{
                      if(e.key === "Enter"){
                        e.preventDefault();
                        handleSaveEdit(note._id)
                      }

                      if(e.key === "Escape"){
                        handleCancelEdit();
                      }
                    }} ref={editInputRef} value={editTitle} onChange={(e) => setEditTitle(e.target.value)} className="border-b border-b-gray-300 px-2 py-1 mr-8 outline-none" />
                  
                  <textarea onKeyDown={(e)=>{
                      if(e.key === "Enter"){
                        e.preventDefault();
                        handleSaveEdit(note._id)
                      }

                      if(e.key === "Escape"){
                        handleCancelEdit();
                      }
                    }} value={editContent} onChange={(e) => setEditContent(e.target.value)} className=" px-2 py-1 outline-none min-h-25" />
                
                  
                </div>
              ) : (
                <>
                  <div className='flex flex-col -top-2 mx-2 gap-y-2 w-full'>
                    <span className='font-semibold text-xl tracking-wider'>{note.title}</span>
                    <span className='text-gray-800 tracking-wider -mr-2  overflow-y-scroll '>{note.content}</span>
                  </div>
                  <div className='w-fit'>
                    <button onClick={() => handleDeleteNote(note._id)} title='Delete' className='absolute -right-2 top-0 px-4 py-2 text-black hover:text-red-500 hover:duration-150 text-2xl hover:cursor-pointer font-semibold ml-4'><MdDeleteOutline /></button>
                  </div>
                  <div className='w-fit'>
                    <button onClick={() => handleStartEdit(note)} title='Edit' className='absolute right-6 top-0 px-4 py-2 hover:text-green-500  hover:duration-150 hover:cursor-pointer font-semibold ml-2'><RiPencilFill size={22} /></button>
                  </div>
                </>
              )}

          </li>
        ))}
      </ul>

        {notes.length > 0 && (
          <div className='flex gap-4 mt-6 items-center'>
            <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}
              className='px-3 py-1 rounded disabled:opacity-50 font-semibold hover:cursor-pointer hover:bg-gray-100 bg-white border border-blue-300'
            >
              Pre
            </button>

            <span>Page {page} of {totalPages}</span>

            <button disabled={page === totalPages} onClick={() => setPage((p) => p + 1)}
              className='px-3 py-1 rounded disabled:opacity-50 font-semibold hover:cursor-pointer hover:bg-gray-100 bg-white border border-blue-300'
            >
              Next
            </button>

          </div>

        )}
    </div>
  )
}

export default Notes