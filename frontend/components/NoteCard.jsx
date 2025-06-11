import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import { formatDate } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";

const NoteCard = ({ note, setNotes }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault(); // get rid of the navigation behaviour

    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((note) => note._id !== id)); // get rid of the deleted one
      toast.success("Note deleted successfully");
    } catch (error) {
      console.log("Error in handleDelete", error);
      toast.error("Failed to delete note");
    }
  };
 
  return (
    <Link
      to={`/note/${note._id}`}
      className="card bg-base-100 hover:shadow-xl transition-all duration-300 
      border-t-4 border-solid border-primary hover:border-primary-focus
      hover:-translate-y-1"
    >
      <div className="card-body">
        <h3 className="card-title text-base-content font-semibold">{note.title}</h3>
        <p className="text-base-content/70 line-clamp-3 text-sm">{note.content}</p>
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60 font-medium">
            {formatDate(new Date(note.createdAt))}
          </span>
          <div className="flex items-center gap-2">
            <button 
              className="btn btn-ghost btn-sm text-primary hover:text-primary-focus"
              aria-label="Edit note"
            >
              <PenSquareIcon className="size-4" />
            </button>
            <button 
              aria-label={`delete notes titled ${note.title}`}
              className="btn btn-ghost btn-sm text-error hover:text-error-focus"
              onClick={(e) => handleDelete(e, note._id)}
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default NoteCard;