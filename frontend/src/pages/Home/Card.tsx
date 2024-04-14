import { useState, FC, RefObject } from "react";
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { motion } from "framer-motion";

interface cardInterface {
  reference: RefObject<HTMLDivElement>;
}

const Card: FC<cardInterface> = ({ reference }) => {
  const content: string =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

  const [showNote, setShowNote] = useState(false);
  const [close, setClose] = useState(false);

  const handleNote = () => {
    setShowNote(!showNote);
  };

  const handleClose = () => {
    setClose(!close);
  };
  return (
    <>
      <motion.div
        drag
        dragConstraints={reference}
        whileDrag={{ scale: 1.2 }}
        dragElastic={0.1}
        dragTransition={{ bounceStiffness: 100, bounceDamping: 30 }}
        initial={{ opacity: 0, y: -150 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -150 }}
        transition={{ duration: 0.4, ease: "linear" }}
        className="card font-Signika w-96 bg-base-100 shadow-xl cursor-pointer "
      >
        <div className="card-body">
          <h2 className="card-title">Note Heading!</h2>
          <p onClick={handleNote}>{content.substring(0, 100)}...</p>
          <div className="card-actions justify-between items-end">
            <button className="btn btn-ghost">
              <MdDelete size={20} />
            </button>
            <button onClick={handleClose} className="btn btn-ghost">
              <MdModeEditOutline size={20} />
            </button>
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
            className={`flex flex-col justify-between font-Signika p-2 absolute top-28 left-1/4  w-1/2 max-h-96 overflow-auto`}
          >
            <p>
              {content}
              {content}
            </p>
            <button
              onClick={handleNote}
              className="btn btn-primary flex w-20 self-end mt-3"
            >
              Close
            </button>
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
                value={"heading"}
                type="text"
                placeholder="Heading"
                className="input input-bordered w-full max-w-xs"
              />
              <textarea
                value={content}
                className="textarea textarea-bordered h-60"
                placeholder="Content"
              ></textarea>
            </div>
            <div className="flex justify-between">
              <button
                onClick={handleClose}
                className="btn btn-primary flex w-20"
              >
                Close
              </button>
              <button className="btn btn-primary flex w-20">Edit</button>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};
export default Card;
