import { FaPen, FaTrash } from "react-icons/fa";

const Notes = ({ notes, onDelete, onEdit }) => {
  const categoryColors = {
    Work: "bg-blue-400",
    Personal: "bg-green-400",
    Study: "bg-purple-400",
    Ideas: "bg-pink-400",
    Other: "bg-gray-400",
  };

  return (
    <div className="m-4 min-w-xl">
      <h2 className="bg-gradient-to-r from-zinc-900  to-gray-200 bg-gradient bg-clip-text text-transparent leading-normal flex justify-center items-center text-2xl md:text-3xl font-mono font-bold my-6 md:my-10">
        Your Notes
      </h2>

      <div className="flex flex-wrap gap-4 justify-center">
        {notes.length === 0 && (
          <p className="text-gray-500 text-lg md:text-xl mb-6 md:mb-8">No notes yet. Add one!</p>
        )}

        {notes.map((note) => {
          const created = note.createdAt ?? note.date;
          const updated = note.updatedAt ?? created;
          const wasEdited = created && updated && updated !== created;

          const formatDate = (iso) => {
            const d = new Date(iso);
            return isNaN(d) ? "—" : d.toLocaleString();
          };

          const badgeColor =
            categoryColors[note.category] || categoryColors["Other"];

          return (
            <div
              key={note.id}
              className="flex flex-col min-w-lg sm:w-64 md:w-78 px-4 py-2 mb-6 md:mb-12  shadow-md border border-gray-200 rounded-2xl bg-white"
            >
              {/* Action buttons row */}
              <div className="flex justify-end gap-3 ml-2 md:ml-6 mt-2 md:mt-4">
                <div
                  className="relative group text-sm"
                  onClick={() => onEdit(note)}
                >
                  <FaPen className="cursor-pointer hover:text-blue-500 transition" />
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-2 py-1 text-sm text-white bg-gray-700 rounded opacity-0 group-hover:opacity-100 transition">
                    Edit
                  </span>
                </div>

                <div
                  className="relative group text-sm"
                  onClick={() => onDelete(note.id)}
                >
                  <FaTrash className="cursor-pointer hover:text-red-500 transition " />
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-2 py-1 text-sm text-white bg-gray-700 rounded opacity-0 group-hover:opacity-100 transition">
                    Delete
                  </span>
                </div>
              </div>

              {/* Note content */}
              <div className="mt-[-22px] pr-2 md:pr-6">
                <h4 className="font-mono font-extrabold text-lg md:text-2xl mb-2 break-words">
                  {note.title}
                </h4>
                <hr className="max-w-4/5 text-gray-300" />
                <p className="font-mono font-medium text-gray-700 break-words line-clamp-3 my-4 md:my-6">
                  {note.description}
                </p>
              </div>

              {note.category && (
                <span
                  className={`self-start mt-2 px-3 py-1 text-xs font-semibold text-white rounded-full ${badgeColor}`}
                >
                  {note.category}
                </span>
              )}

              <div className="mt-4 text-xs text-gray-500">
                {wasEdited ? (
                  <p>Last updated: {formatDate(updated)}</p>
                ) : (
                  <p>Created: {formatDate(created)}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Notes;
