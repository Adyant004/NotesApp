import { useState, FC, RefObject, FormEvent } from "react";
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { motion } from "framer-motion";
import useNoteContext from "../../zustand/useNoteContext";
import useUpdateNote from "../../hooks/useUpdateNote";
import useDeleteNote from "../../hooks/useDeleteNote";
import { extractTime } from "../../utils/extractTime";

type Note = {
  content: string;
  createdAt: string;
  creatorId: string;
  heading: string;
  updatedAt: string;
  _id: string;
};

interface cardInterface {
  note: Note;
  reference: RefObject<HTMLDivElement>;
}

const Card: FC<cardInterface> = ({ reference, note }) => {
  const [showNote, setShowNote] = useState(false);
  const [close, setClose] = useState(false);
  const {  setSelectedNote } = useNoteContext();
  const { loading, update } = useUpdateNote();
  const { deleting, Delete } = useDeleteNote();

  const [heading, setHeading] = useState(note.heading);
  const [content, setContent] = useState(note.content);
  const createdTime: string = extractTime(note.createdAt);

  const handleNote = () => {
    setSelectedNote(note);
    setShowNote(!showNote);
  };

  const handleEdit = async (e: FormEvent) => {
    e.preventDefault();
    if (loading) return;
    await update(heading, content);
    setClose(!close);
  };

  const handleClose = () => {
    if (close) {
      setSelectedNote(null);
    } else {
      setSelectedNote(note);
    }
    setClose(!close);
  };

  const handleDelete = async (e: FormEvent) => {
    e.preventDefault();
    if (deleting) return;
    setSelectedNote(note);
     const bool = confirm("Are you sure ?");
    if (bool) {
       setSelectedNote(note);
       await Delete();
     }
     setSelectedNote(null);
     setShowNote(!showNote);
  };
  return (
    <>
      <motion.div
        drag
        dragConstraints={reference}
        whileDrag={{ scale: 1.1 }}
        dragElastic={0.1}
        dragTransition={{ bounceStiffness: 100, bounceDamping: 30 }}
        initial={{ opacity: 0, y: -150 }}
        animate={{ y: 0 }}
        whileInView={{ opacity: 1 }}
        exit={{ opacity: 0, y: -150 }}
        transition={{ duration: 0.4, ease: "linear" }}
        className="card font-Signika w-96 bg-base-100 shadow-xl cursor-pointer "
      >
        <div className="card-body">
          <h2 className="card-title">{note.heading}</h2>
          <p onClick={handleNote}>
            {note.content?.substring(0, 100)}{" "}
            {note.content?.length < 100 ? "" : "..."}
          </p>
          <div className="card-actions justify-between items-center">
            <button onClick={handleClose} className="btn btn-ghost">
              <MdModeEditOutline size={20} />
            </button>
            <span className="text-xs">Created at {createdTime}</span>
          </div>
        </div>
      </motion.div>
      {showNote && (
        <motion.div
          initial={{ opacity: 0, y: -150 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -150 }}
          transition={{ duration: 0.4, ease: "linear" }}
          className="w-full h-screen backdrop-blur-md absolute z-10 top-0 left-0"
        >
          <div
            className={`flex flex-col justify-between font-Signika p-2 absolute top-28 left-1/4  w-1/2 max-h-96 overflow-auto gap-3`}
          >
            <h1 className="font-bold text-3xl">{note.heading}</h1>
            <p>{note.content}</p>
            <div className="flex justify-between items-center">
              <button onClick={handleDelete} className="btn btn-ghost">
                <MdDelete size={20} />
              </button>
              <button
                onClick={handleNote}
                className="btn btn-primary flex w-20 self-end mt-3"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      )}
      {close && (
        <motion.div
          initial={{ opacity: 0, y: -150 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -150 }}
          transition={{ duration: 0.4, ease: "linear" }}
          className="w-full h-screen backdrop-blur-md absolute z-10 top-0 left-0"
        >
          <div
            className={`flex flex-col justify-between font-Signika p-2 absolute top-28 left-1/4  w-1/2 max-h-96 overflow-auto`}
          >
            <div className="flex flex-col gap-4 mb-2">
              <input
                value={heading}
                type="text"
                placeholder="Heading"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setHeading(e.target.value)}
              />
              <textarea
                value={content}
                className="textarea textarea-bordered h-60"
                placeholder="Content"
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
            </div>
            <div className="flex justify-between">
              <button
                onClick={handleClose}
                className="btn btn-primary flex w-20"
              >
                Close
              </button>
              <button
                onClick={handleEdit}
                className="btn btn-primary flex w-20"
              >
                Edit
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};
export default Card;
