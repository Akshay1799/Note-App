import { useState, useEffect } from "react";
import FormInput from "./components/FormInput";
import Notes from "./components/Notes";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";

function App() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  const [editingNote, setEditingNote] = useState(null);

  // Categories + filters
  const [categories, setCategories] = useState(["All", "Personal", "Work", "Study"]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = (id) => setNotes(notes.filter((n) => n.id !== id));

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const handleUpdate = (updatedNote) => {
    setNotes(
      notes.map((note) =>
        note.id === updatedNote.id ? { ...note, ...updatedNote } : note
      )
    );
    setEditingNote(null);
  };

  // ✅ Filtering logic
  const filteredNotes = notes.filter((note) => {
    const matchesCategory =
      selectedCategory === "All" || note.category === selectedCategory;
    const matchesSearch =
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col">
      {/* Note form */}
      <FormInput
        setNotes={setNotes}
        editingNote={editingNote}
        onUpdate={handleUpdate}
        categories={categories.filter((c) => c !== "All")}
      />

      {/* Layout */}
      <div className="flex flex-1 gap-6 px-6">
        <Sidebar
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          onAddClick={() =>
            document.getElementById("note-form")?.scrollIntoView({ behavior: "smooth" })
          }
        />

        <main className="flex-1">
          {/* Search */}
          <div className="flex justify-center my-4">
            <input
              type="search"
              placeholder="Search notes..."
              className="w-full max-w-xl border rounded-3xl px-4 py-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filtered Notes */}
          <Notes notes={filteredNotes} onDelete={handleDelete} onEdit={setEditingNote} />
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default App;
