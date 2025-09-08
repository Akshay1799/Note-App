// App.jsx
import { useState, useEffect } from "react"
import FormInput from "./components/FormInput"
import Notes from "./components/Notes"
import Footer from "./components/Footer";
function App() {

  // const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null)

  const [notes, setNotes] = useState(() => {
  const savedNotes = localStorage.getItem("notes");
  return savedNotes ? JSON.parse(savedNotes) : [];
});

  const handleDelete = (id) => {
    setNotes(notes.filter(note => note.id !== id))
  }

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);


  const handleUpdate = (updatedNote) => {
    setNotes(notes.map((note) => note.id === updatedNote.id ? { ...note, ...updatedNote } : note));
    setEditingNote(null);
  }

  return (
    <div>
      <FormInput setNotes={setNotes} editingNote={editingNote} onUpdate={handleUpdate} />
      <Notes notes={notes} onDelete={handleDelete} onEdit={setEditingNote} />
      <Footer />
    </div>
  )
}

export default App
