import { useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const Card = () => {
  const content: string =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

  const [showNote, setShowNote] = useState(false);
  const [edit,setEdit] = useState(false);

  const handleNote = () => {
    setShowNote(!showNote);
  };

  const handleEdit = () => {
    setEdit(!edit)
  }
  return (
    <>
      {/* <div className="relative"> */}
        <div
          className="card font-Signika w-96 bg-base-100 shadow-xl cursor-pointer "
        >
          <div className="card-body">
            <h2 onClick={handleNote} className="card-title">Note Heading!</h2>
            <p onClick={handleNote}>{content.substring(0, 100)}...</p>
            <div className="card-actions justify-between items-end">
              <button className="btn btn-ghost">
                <MdDelete size={20} />
              </button>
              <button onClick={handleEdit} className="btn btn-ghost">
                <MdModeEditOutline size={20} />
              </button>
            </div>
          </div>
        </div>
        {showNote && (
          <div className="w-full h-screen backdrop-blur-md absolute z-10 top-0 left-0">
            <div className={`flex flex-col justify-between font-Signika p-2 absolute top-28 left-1/4  w-1/2 max-h-96 overflow-auto`}>
              <p>{content}
              {content}
              {content}
              {content}</p>
              <button onClick={handleNote} className="btn btn-primary flex w-20 self-end">
                Close
              </button>
              </div>
          </div>
        )}
   {edit && (
          <div className="w-full h-screen backdrop-blur-md absolute z-10 top-0 left-0">
            <div className={`flex flex-col justify-between font-Signika p-2 absolute top-28 left-1/4  w-1/2 max-h-96 overflow-auto`}>
              <div className="flex flex-col gap-4 mb-2">
              <input value={"heading"} type="text" placeholder="Heading" className="input input-bordered w-full max-w-xs" />
              <textarea value={content} className="textarea textarea-bordered h-60" placeholder="Content"></textarea>
              </div>
              <button onClick={handleEdit} className="btn btn-primary flex w-20 self-end">
                Edit
              </button>
              </div>
          </div>
        )}
    </>
  );
};
export default Card;