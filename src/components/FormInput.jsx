import React, { useEffect, useState } from "react";

const FormInput = ({ setNotes, editingNote, onUpdate }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setDescription(editingNote.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [editingNote]);

  const handleAddOrUpdate = () => {
    if (!title.trim() || !description.trim()) return;

    const nowIso = new Date().toISOString();

    if (editingNote) {
      const updateNote = {
        ...editingNote,
        title: title.trim(),
        description: description.trim(),
        updatedAt: nowIso, // updated time
      };
      onUpdate(updateNote);
    } else {
      const newNote = {
        id: Date.now(),
        title: title.trim(),
        description: description.trim(),
        createdAt: nowIso,
        updatedAt: nowIso, // same as created at
      };
      setNotes((prevNotes) => [...prevNotes, newNote]);
    }

    setTitle("");
    setDescription("");
  };

  return (
    <div className="flex justify-center sticky flex-col items-center m-8">
      <h2 className="font-mono text-black text-2xl md:text-3xl font-bold mt-8 mask-b-from-fuchsia-500 mx-auto">
        Got an idea? Write it down
      </h2>
      <div className="mx-auto relative  flex justify-center items-center flex-col w-2xl py-8 mt-8 my-8 border border-gray-200 rounded-2xl shadow-lg/20 bg-blur">
        <div className="group relative">
          <button
            type="button"
            className="absolute left-66 top-[-15px] rounded-2xl px-4 mt-0 hover:cursor-pointer hover:bg-blue-100 border border-gray-300 font-semibold hover:duration-600 ease-out"
            onClick={handleAddOrUpdate}
          >
            <span className="text-2xl text-shadow-sm">{editingNote ? "✎" : "+"}</span>
          </button>
          <span className="absolute left-51 bottom-3 translate-x-1/2 mb-2 w-max px-2 py-1 text-sm text-white bg-gray-700 rounded opacity-0 group-hover:opacity-100 transition">
            {editingNote ? "Update Note" : "Add a Note"}
          </span>
        </div>
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
        <textarea
          placeholder="Description..."
          className="mt-6 px-4 pt-2 max-h-44 min-h-18 w-106 border border-gray-200 rounded-2xl bg-white text-wrap font-mono text-gray-700 resize-none"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
    </div>
  );
};

export default FormInput;
