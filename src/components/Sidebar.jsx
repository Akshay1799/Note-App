import React from "react";

const Sidebar = ({ categories = [], selectedCategory, setSelectedCategory, onAddClick }) => {
  return (
    <aside className="w-64 p-4  ml-6 mt-34 border-none shadow-xl rounded-2xl h-fit  ">
      <button
        onClick={onAddClick}
        className="w-full mb-4 bg-amber-300 hover:bg-amber-400 text-center py-2 rounded font-semibold"
      >
        + Add Note
      </button>

      <h3 className="m-2 pl-1 font-semibold">Categories</h3>
      <ul className="space-y-2 mt-2">
        {categories.map((cat) => (
          <li key={cat}>
            <button
              onClick={() => setSelectedCategory(cat)}
              className={`w-full text-left px-3 py-1 rounded ${
                selectedCategory === cat
                  ? "bg-gray-200"
                  : "hover:bg-gray-100"
              }`}
            >
              {cat}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
