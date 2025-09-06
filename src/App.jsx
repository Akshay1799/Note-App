// App.jsx
import { useState } from "react"
import FormInput from "./components/FormInput"
import Notes from "./components/Notes"
function App() {

  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null)

  const handleDelete = (id)=>{
      setNotes(notes.filter(note => note.id !== id))
    }

    const handleUpdate = (updatedNote)=>{
      setNotes(notes.map((note)=>note.id === updatedNote.id?updatedNote:note));
      setEditingNote(null);
    }

  return (
    <div>
      <FormInput setNotes={setNotes} editingNote={editingNote} onUpdate={handleUpdate}/>
      <Notes notes={notes} onDelete={handleDelete} onEdit={setEditingNote}/>
    </div>
  )
}

export default App
