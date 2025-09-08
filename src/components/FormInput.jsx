import React, { useEffect, useState } from "react";

const FormInput = ({ setNotes, editingNote, onUpdate, categories }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(categories[0] || "Personal");

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setDescription(editingNote.description);
      setCategory(editingNote.category || categories[0]);
    } else {
      setTitle("");
      setDescription("");
      setCategory(categories[0] || "Personal");
    }
  }, [editingNote, categories]);

  const handleAddOrUpdate = () => {
    if (!title.trim() || !description.trim()) return;

    const nowIso = new Date().toISOString();

    if (editingNote) {
      const updateNote = {
        ...editingNote,
        title: title.trim(),
        description: description.trim(),
        category,
        updatedAt: nowIso,
      };
      onUpdate(updateNote);
    } else {
      const newNote = {
        id: Date.now(),
        title: title.trim(),
        description: description.trim(),
        category,
        createdAt: nowIso,
        updatedAt: nowIso,
      };
      setNotes((prevNotes) => [...prevNotes, newNote]);
    }

    setTitle("");
    setDescription("");
    setCategory(categories[0] || "Personal");
  };

  return (
    <div
      id="note-form"
      className="flex justify-center sticky flex-col items-center m-8"
    >
      <h2 className="font-mono text-black text-2xl md:text-3xl font-bold mt-8 mask-b-from-fuchsia-500 mx-auto">
        Got an idea? Write it down
      </h2>
      <div className="mx-auto relative flex justify-center items-center flex-col w-2xl py-8 mt-8 my-8 border border-gray-200 rounded-2xl shadow-lg/20 bg-blur">
        {/* Add / Update button */}
        <div className="group relative">
          <button
            type="button"
            className="absolute left-66 top-[-15px] rounded-2xl px-4 mt-0 hover:cursor-pointer hover:bg-blue-100 border border-gray-300 font-semibold hover:duration-600 ease-out"
            onClick={handleAddOrUpdate}
          >
            <span className="text-2xl text-shadow-sm">
              {editingNote ? "✎" : "+"}
            </span>
          </button>
          <span className="absolute left-51 bottom-3 translate-x-1/2 mb-2 w-max px-2 py-1 text-sm text-white bg-gray-700 rounded opacity-0 group-hover:opacity-100 transition">
            {editingNote ? "Update Note" : "Add a Note"}
          </span>
        </div>

        {/* Title */}
        <div>
          <input
            type="text"
            placeholder="Title"
            className="border border-gray-200 mx-2 py-2 px-4 mt-6 w-106 rounded-2xl bg-white font-mono"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={50}
          />
        </div>

        {/* Description */}
        <textarea
          placeholder="Description..."
          className="mt-6 px-4 pt-2 max-h-44 min-h-18 w-106 border border-gray-200 rounded-2xl bg-white text-wrap font-mono text-gray-700 resize-none"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        {/* Category Dropdown */}
        <select
          className="mt-6 px-4 py-2 w-106 border border-gray-200 rounded-2xl bg-white font-mono"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FormInput;
