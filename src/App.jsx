import { useState } from "react"
import FormInput from "./components/FormInput"
import Notes from "./components/Notes"
function App() {

  const [notes, setNotes] = useState([]);

  const handleDelete = (id)=>{
      setNotes(notes.filter(note => note.id !== id))
    }

  return (
    <>
      <FormInput setNotes={setNotes}/>
      <Notes notes={notes} onDelete={handleDelete}/>
    </>
  )
}

export default App
