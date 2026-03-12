// pages/Notes.jsx

import { useState, useEffect, useRef } from 'react'
import { getNotes, createNote, deleteNote, updateNote } from '../api/notes'
import { MdDeleteOutline, MdOutlineCancel, MdOutlineCheck } from "react-icons/md";
import { PiNotePencilBold } from "react-icons/pi";
import { RiPencilFill } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { IoSearchOutline } from "react-icons/io5";

/* Accent colours for the top bar of each card */
const CARD_ACCENTS = [
  'bg-gradient-to-r from-indigo-500 to-indigo-400',
  'bg-gradient-to-r from-purple-500 to-purple-400',
  'bg-gradient-to-r from-blue-500 to-blue-400',
  'bg-gradient-to-r from-cyan-500 to-cyan-400',
  'bg-gradient-to-r from-emerald-500 to-emerald-400',
  'bg-gradient-to-r from-amber-500 to-amber-400',
];

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

  useEffect(() => { fetchNotes(); }, [page, debounceSearch])

  useEffect(() => {
    return () => { 
      if (abortControllerRef.current) abortControllerRef.current.abort(); 
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setDebounceSearch(search), 400);
    return () => clearTimeout(timer);
  }, [search])

  useEffect(() => {
    if (editingNoteId && editInputRef.current){ 
      editInputRef.current.focus();
    }
  }, [editingNoteId])

  const fetchNotes = async () => {
    try {
      setLoading(true);
      if (abortControllerRef.current){
        abortControllerRef.current.abort();
      }
      const controller = new AbortController();
      abortControllerRef.current = controller;

      const data = await getNotes({ page, limit, q: debounceSearch }, controller.signal);
      
      setNotes(data.notes || []);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      if (err.name !== "CanceledError" && err.name !== "AbortError") setError("Failed to load notes");
    } finally { setLoading(false); }
  }

  const handleCreateNote = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      const data = await createNote({ title, content });

      setNotes(prev => [data.note, ...prev]);
      setTitle(""); setContent(""); setIsFormOpen(false);

    } catch { setError('Failed to create note'); }
  }

  const handleDeleteNote = async (id) => {
    const prev = notes;
    setNotes(n => n.filter(note => note._id !== id));

    try { 
      await deleteNote(id); 
      fetchNotes(); 
    }
    catch { 
      setNotes(prev); 
      setError('Failed to delete note'); 
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
    const prev = notes;
    try {
      await updateNote(id, { title: editTitle, content: editContent });
      
      setNotes(n => n.map(note => note._id === id ? { ...note, title: editTitle, content: editContent } : note));
      
      setEditingNoteId(null); 
      setEditTitle(""); 
      setEditContent("");
    } catch { 
      setNotes(prev); 
      setError("Failed to update note"); }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="w-11 h-11 rounded-full border-4 border-violet-200 dark:border-slate-700 border-t-indigo-500 animate-spin" />
        <p className="text-gray-400 dark:text-slate-500 text-sm">Loading your notes...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-8 pb-16 flex flex-col items-center
                    min-h-[calc(100vh-64px)] bg-violet-50 dark:bg-slate-950
                    transition-colors duration-300">

      {/* Error */}
      {error && (
        <div className="w-full max-w-2xl mb-5 px-4 py-2.5 rounded-xl text-sm
                        bg-red-50 dark:bg-red-500/10
                        border border-red-200 dark:border-red-400/30
                        text-red-600 dark:text-red-400">
          {error}
        </div>
      )}

      {/* New Note */}
      <div className="w-full flex justify-start mb-5">
        {isFormOpen ? (
          <button onClick={() => setIsFormOpen(false)} className="btn-ghost px-4 py-2">
            <MdOutlineCancel size={18} /> Cancel
          </button>
        ) : (
          <button onClick={() => setIsFormOpen(true)}
            className="btn-primary flex items-center gap-2 px-5 py-2.5 text-sm rounded-xl">
            <PiNotePencilBold size={18} /> New Note
          </button>
        )}
      </div>

      {/* New Note Form */}
      {isFormOpen && (
        <div className="w-full max-w-2xl mb-7 animate-slide-up">
          <form onSubmit={handleCreateNote}
            className="bg-white dark:bg-white/5 dark:backdrop-blur-xl
                       border border-violet-100 dark:border-white/10
                       rounded-2xl p-5 flex flex-col gap-3
                       shadow-xl shadow-indigo-100/50 dark:shadow-black/30">
            <input
              value={title} onChange={e => setTitle(e.target.value)}
              type="text" placeholder="Note title..."
              className="w-full bg-violet-50 dark:bg-white/[0.07]
                         border border-violet-100 dark:border-white/10 rounded-xl
                         px-4 py-3 text-indigo-950 dark:text-slate-100 font-semibold text-base
                         placeholder:text-gray-400 dark:placeholder:text-slate-500
                         outline-none focus:border-indigo-400 dark:focus:border-indigo-500
                         focus:ring-2 focus:ring-indigo-200/40 dark:focus:ring-indigo-500/15
                         transition-all duration-300"
            />
            <textarea
              placeholder="Write something..."
              value={content} onChange={e => setContent(e.target.value)}
              rows={4}
              className="w-full bg-violet-50 dark:bg-white/[0.07]
                         border border-violet-100 dark:border-white/10 rounded-xl
                         px-4 py-3 text-indigo-950 dark:text-slate-100 text-sm
                         placeholder:text-gray-400 dark:placeholder:text-slate-500
                         outline-none focus:border-indigo-400 dark:focus:border-indigo-500
                         focus:ring-2 focus:ring-indigo-200/40 dark:focus:ring-indigo-500/15
                         resize-y min-h-24 max-h-70 transition-all duration-300"
            />
            <div className="flex justify-end">
              <button type="submit"
                className="btn-primary flex items-center gap-1.5 px-6 py-2.5 text-sm rounded-xl">
                + Add Note
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Header and Search */}
      {notes.length > 0 && (
        <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center my-5 gap-3">
          <h2 className="text-3xl font-extrabold tracking-tight
                         text-indigo-900 dark:text-slate-100
                         transition-colors duration-300">
            My Notes
          </h2>
          <div className="relative">
            <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500 text-lg pointer-events-none" />
            <input
              type="text" value={search} placeholder="Search notes..."
              onChange={e => { setPage(1); setSearch(e.target.value); }}
              className="bg-white dark:bg-white/[0.07]
                         border border-violet-200 dark:border-white/10 rounded-xl
                         pl-9 pr-4 py-2.5 text-sm w-full sm:w-56
                         text-indigo-950 dark:text-slate-100
                         placeholder:text-gray-400 dark:placeholder:text-slate-500
                         outline-none focus:border-indigo-400 dark:focus:border-indigo-500
                         focus:ring-2 focus:ring-indigo-200/40 dark:focus:ring-indigo-500/15
                         shadow-sm dark:shadow-none transition-all duration-300"
            />
          </div>
        </div>
      )}

      {/* Empty State */}
      {notes.length === 0 && (
        <div className="flex flex-col items-center justify-center min-h-[40vh] gap-4">
          <span className="text-6xl drop-shadow-lg">📝</span>
          <p className="text-xl font-bold text-indigo-900 dark:text-slate-100">No notes yet</p>
          <p className="text-sm text-gray-400 dark:text-slate-500">Create your first note to get started</p>
        </div>
      )}

      {/* Note Cards */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full p-0 list-none">
        {notes.map((note, index) => (
          <li
            key={note._id}
            className={`note-card w-full min-h-[190px] animate-card-in
                        ${editingNoteId === note._id ? '' : 'note-card-hoverable cursor-default'}`}
          >
            {/* top border */}
            <div className={`h-0.75 ${CARD_ACCENTS[index % CARD_ACCENTS.length]} shrink-0`} />

            {editingNoteId === note._id ? (
              /* Editing note */
              <div className="flex flex-col gap-2 p-3.5 flex-1">
                <div className="flex justify-end gap-1.5">
                  <button onClick={() => handleSaveEdit(note._id)} title="Save"
                    className="flex items-center justify-center p-1.5 rounded-lg text-base
                               bg-emerald-50 dark:bg-emerald-500/15
                               border border-emerald-200 dark:border-emerald-500/30
                               text-emerald-700 dark:text-emerald-400
                               hover:bg-emerald-100 dark:hover:bg-emerald-500/25
                               transition-all duration-200 cursor-pointer">
                    <MdOutlineCheck />
                  </button>
                  <button onClick={handleCancelEdit} title="Cancel"
                    className="flex items-center justify-center p-1.5 rounded-lg text-base
                               bg-red-50 dark:bg-red-500/15
                               border border-red-200 dark:border-red-500/30
                               text-red-600 dark:text-red-400
                               hover:bg-red-100 dark:hover:bg-red-500/25
                               transition-all duration-200 cursor-pointer">
                    <RxCross2 />
                  </button>
                </div>
                <input
                  ref={editInputRef}
                  value={editTitle}
                  onChange={e => setEditTitle(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === "Enter") { e.preventDefault(); handleSaveEdit(note._id); }
                    if (e.key === "Escape") handleCancelEdit();
                  }}
                  className="w-full bg-indigo-50 dark:bg-white/[0.07]
                             border border-indigo-200 dark:border-white/15 rounded-lg
                             px-2.5 py-1.5 text-indigo-950 dark:text-slate-100
                             text-sm font-semibold outline-none
                             focus:border-indigo-400 dark:focus:border-indigo-500
                             transition-all duration-200"
                />
                <textarea
                  value={editContent}
                  onChange={e => setEditContent(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === "Enter") { e.preventDefault(); handleSaveEdit(note._id); }
                    if (e.key === "Escape") handleCancelEdit();
                  }}
                  className="flex-1 min-h-20 bg-indigo-50 dark:bg-white/[0.07]
                             border border-indigo-200 dark:border-white/15 rounded-lg
                             px-2.5 py-1.5 text-indigo-950 dark:text-slate-100
                             text-xs outline-none resize-none
                             focus:border-indigo-400 dark:focus:border-indigo-500
                             transition-all duration-200"
                />
              </div>
            ) : (
              /* Cards */
              <div className="flex-1 p-3.5 flex flex-col gap-2">
                {/* Action buttons */}
                <div className="flex justify-end gap-1">
                  <button onClick={() => handleStartEdit(note)} title="Edit"
                    className="p-1.5 rounded-lg text-lg flex items-center
                               text-gray-300 dark:text-slate-600
                               hover:text-indigo-500 dark:hover:text-indigo-400
                               hover:bg-indigo-50 dark:hover:bg-indigo-500/15
                               transition-all duration-200 cursor-pointer">
                    <RiPencilFill />
                  </button>
                  <button onClick={() => handleDeleteNote(note._id)} title="Delete"
                    className="p-1.5 rounded-lg text-xl flex items-center
                               text-gray-300 dark:text-slate-600
                               hover:text-red-500 dark:hover:text-red-400
                               hover:bg-red-50 dark:hover:bg-red-500/10
                               transition-all duration-200 cursor-pointer">
                    <MdDeleteOutline />
                  </button>
                </div>
                {/* Content */}
                <div className="flex-1 overflow-hidden">
                  <p className="text-base font-bold text-indigo-900 dark:text-slate-100
                                truncate leading-tight mb-1.5">
                    {note.title}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed
                                overflow-y-auto max-h-26">
                    {note.content}
                  </p>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>

      {/* Pagination */}
      {notes.length > 0 && (
        <div className="flex gap-3 mt-10 items-center">
          <button
            disabled={page === 1}
            onClick={() => setPage(p => p - 1)}
            className="px-5 py-2 rounded-xl text-sm font-semibold
                       bg-white dark:bg-white/6
                       border border-violet-200 dark:border-white/10
                       text-indigo-800 dark:text-slate-300
                       hover:bg-indigo-50 dark:hover:bg-indigo-500/20
                       hover:border-indigo-300 dark:hover:border-indigo-400
                       disabled:opacity-40 disabled:cursor-not-allowed
                       disabled:hover:bg-white dark:disabled:hover:bg-white/6
                       disabled:hover:border-violet-200 dark:disabled:hover:border-white/10
                       transition-all duration-200 cursor-pointer"
          >← Prev</button>

          <span className="px-4 py-2 text-sm rounded-lg
                           bg-indigo-50 dark:bg-indigo-500/15
                           border border-indigo-100 dark:border-indigo-500/25
                           text-indigo-700 dark:text-slate-300">
            {page} / {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(p => p + 1)}
            className="px-5 py-2 rounded-xl text-sm font-semibold
                       bg-white dark:bg-white/6
                       border border-violet-200 dark:border-white/10
                       text-indigo-800 dark:text-slate-300
                       hover:bg-indigo-50 dark:hover:bg-indigo-500/20
                       hover:border-indigo-300 dark:hover:border-indigo-400
                       disabled:opacity-40 disabled:cursor-not-allowed
                       disabled:hover:bg-white dark:disabled:hover:bg-white/6
                       disabled:hover:border-violet-200 dark:disabled:hover:border-white/10
                       transition-all duration-200 cursor-pointer"
          >Next →</button>
        </div>
      )}
    </div>
  )
}

export default Notes