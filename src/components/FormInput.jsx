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
      className="flex justify-center sticky flex-col items-center px-6 m-4 mt-10 mb-12 md:m-8 min-w-xl md:w-fit"
    >
      <h2 className="bg-gradient-to-r from-zinc-900 via-gray-400 to-gray-400 bg-gradient bg-clip-text text-transparent leading-normal font-mono text-xl md:text-3xl font-bold mt-8 mx-auto">
        Got an idea? Write it down
      </h2>
      <div className="mx-auto relative flex justify-center items-center flex-col w-full md:w-2xl py-6 md:py-8 mt-6 md:mt-8 border border-gray-200 rounded-2xl shadow-lg/20 bg-blur">
        
        {/* Add / Update button */}
        <div className="group relative mb-4">
          <button
            type="button"
            className=" inset-shadow-sm inset-shadow-indigo-200 absolute left-48 md:left-64 top-[-12px] my-12 rounded-2xl px-4 mt-0 hover:cursor-pointer hover:bg-gray-100 border border-gray-300 font-semibold hover:duration-600 ease-out"
            onClick={handleAddOrUpdate}
          >
            <span className="text-2xl text-shadow-md">
              {editingNote ? "✎" : "+"}
            </span>
          </button>
          <span className="absolute left-51 bottom-3 translate-x-1/2 mb-2 w-max px-2 py-1 text-sm text-white bg-gray-700 rounded opacity-0 group-hover:opacity-100 transition">
            {editingNote ? "Update Note" : "Add a Note"}
          </span>
        </div>

        {/* Title */}
        <div className="w-full ml-37 ">
          <input
            type="text"
            placeholder="Title"
            className=" md:w-106 w-106  focus:outline-2 focus:outline-indigo-200 shadow-md py-2 px-4 mt-6 ml-[-1.6rem] md:ml-11 md:mt-6 rounded-2xl bg-white font-mono"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={50}
          />
        </div>

        {/* Description */}
        <textarea
          placeholder="Description..."
          className=" md:w-106 w-106 focus:outline-2 focus:outline-indigo-200 mt-4 ml-[-6px] md:mt-6 px-4 pt-2 shadow-md max-h-44 min-h-18 border-none rounded-2xl bg-white font-mono text-gray-700 resize-none"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        {/* Category Dropdown */}
        <select
          className="w-106 md:w-106 ml-[-6px]  focus:outline-2 focus:outline-indigo-200 mt-4 md:mt-6 px-4 py-2 shadow-md border-none rounded-2xl bg-white font-mono"
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
