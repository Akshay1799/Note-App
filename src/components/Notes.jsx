//Notes
import { FaPen, FaTrash } from "react-icons/fa";

const Notes = ({ notes, onDelete, onEdit }) => {

  return (
    <div className="m-6">
      <h2 className="flex justify-center items-center text-3xl font-mono font-bold my-6">
        Your Notes
      </h2>

      <div className="flex flex-wrap gap-4 justify-center">
        {notes.length === 0 && (
          <p className="text-gray-500">No notes yet. Add one!</p>
        )}

        {notes.map((note) => (
          <div
            key={note.id}
            className="flex flex-col w-78 px-4 py-2 mb-4 shadow-md border rounded-2xl  backdrop-blur-2xl"
          >
            {/* Action buttons row */}
            <div className="flex justify-end gap-3 ml-6 mt-4">
              {/* Edit button */}
              <div className="relative group text-sm"
              onClick={()=>onEdit(note)}
              >
                <FaPen className="cursor-pointer hover:text-blue-500 transition" />
                
                <span
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2
                             w-max px-2 py-1 text-sm text-white bg-gray-700 rounded
                             opacity-0 group-hover:opacity-100 transition 
                             after:content-[''] after:absolute after:top-full after:left-1/2 
                             after:-translate-x-1/2 after:border-4 
                             after:border-transparent after:border-t-gray-700"
                >
                  Edit
                </span>
              </div>

              {/* Delete button */}
              <div className="relative group text-sm"
              onClick={()=>onDelete(note.id)}>
                <FaTrash className="cursor-pointer hover:text-red-500 transition" />
                <span
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2
                             w-max px-2 py-1 text-sm text-white bg-gray-700 rounded
                             opacity-0 group-hover:opacity-100 transition 
                             after:content-[''] after:absolute after:top-full after:left-1/2 
                             after:-translate-x-1/2 after:border-4 
                             after:border-transparent after:border-t-gray-700"
                >
                  Delete
                </span>
              </div>
            </div>

            {/* Note content */}
            <div className="mt-[-22px] pr-6">
              <h4 className="font-mono font-extrabold text-2xl mb-2 break-words mr-8 ">{note.title}</h4>
              <p className="font-mono font-medium text-gray-700 pr-2 break-words line-clamp-3 mt-6">
                {note.description}
              </p>
            </div>

            {/* Timestamp */}
            <div className="mt-6 text-xs text-gray-500">
              <time className="font-mono">{new Date(note.date).toLocaleString()}</time>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notes;
