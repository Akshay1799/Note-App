import { useState, useEffect } from "react";
import FormInput from "./components/FormInput";
import Notes from "./components/Notes";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import { FaBars } from "react-icons/fa";

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

  // Sidebar toggle state (for mobile)
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  // Filter notes
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
      {/* Header for mobile toggle */}
      <div className="flex items-center relative my-4 px-4 py-2 md:hidden z-1  backdrop-blur-2xl">
        <button
          className="p-2 fixed md:fixed text-xl mt-8 md:hover:cursor-pointer "
          onClick={() => setSidebarOpen((prev) => !prev)}
        >
          <FaBars />
        </button>
        <h1 className="text-lg font-bold fixed mt-8 ml-12 tracking-wider ">Notesify</h1>
      </div>

      {/* Note form + Sidebar */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-20 px-4 md:px-6">
        {/* Sidebar - collapsible on mobile */}
        {sidebarOpen && (
          <div className="md:hidden">
            <Sidebar
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              onAddClick={() =>
                document
                  .getElementById("note-form")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            />
          </div>
        )}

        {/* Sidebar always visible on desktop */}
        <div className="hidden md:block">
          <Sidebar
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            onAddClick={() =>
              document
                .getElementById("note-form")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          />
        </div>

        <FormInput
          setNotes={setNotes}
          editingNote={editingNote}
          onUpdate={handleUpdate}
          categories={categories.filter((c) => c !== "All")}
        />
      </div>

      {/* Layout */}
      <div className="flex flex-1 flex-col md:flex-row gap-6 px-4 md:px-6">
        <main className="flex-1 mb-10">
          {/* Search */}
          <div className="flex justify-center min-w-lg ml-12 my-4">
            <input
              type="search"
              placeholder="Search notes..."
              className="w-full max-w-xl border border-blue-100 focus:outline-blue-100  rounded-3xl px-4 py-2 mb-4"
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
