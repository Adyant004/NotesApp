import { useState } from "react";
import { IoMdAddCircle } from "react-icons/io";

const CreateNote = () => {
  const [create, setCreate] = useState(false);

  const handleCreate = () => {
    setCreate(!create);
  }
  return (
    <>
    <div onClick={handleCreate} className="cursor-pointer">
        <IoMdAddCircle size={40} />
    </div>
    {create && (
          <div className="w-full h-screen backdrop-blur-md absolute z-10 top-0 left-0">
            <div className={`flex flex-col justify-between font-Signika p-2 absolute top-28 left-1/4  w-1/2 max-h-96 overflow-auto`}>
              <div className="flex flex-col gap-4 mb-2">
              <input type="text" placeholder="Heading" className="input input-bordered w-full max-w-xs" />
              <textarea className="textarea textarea-bordered h-60" placeholder="Content"></textarea>
              </div>
              <button onClick={handleCreate} className="btn btn-primary flex w-20 self-end">
                Create
              </button>
              </div>
          </div>
        )}
    </>
  )
}

export default CreateNote
