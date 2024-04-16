import { FormEvent, useState } from "react";
import { IoMdAddCircle } from "react-icons/io";
import { motion } from "framer-motion";
import useCreateNote from "../../hooks/useCreateNote";

const CreateNote = () => {
  const [close, setClose] = useState(false);
  const [inputs,setInputs] = useState({
    heading: "",
    content: ""
  })

  const {loading,create} = useCreateNote();

  const handleClose = () => {
    setClose(!close);
  };

  const handleCreate = async(e: FormEvent) => {
    e.preventDefault();
    if(loading) return;
    await create(inputs);
    if(inputs.content) setClose(!close);
    setInputs({
      heading: "",
      content: ""
    })
  }
  return (
    <>
      <div onClick={handleClose} className="cursor-pointer">
        <IoMdAddCircle className="text-neutral-content" size={40} />
      </div>
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
                type="text"
                placeholder="Heading"
                className="input input-bordered w-full max-w-xs"
                value={inputs.heading}
                onChange={(e) => setInputs({...inputs, heading: e.target.value})}
              />
              <textarea
                className="textarea textarea-bordered h-60"
                placeholder="Content"
                value={inputs.content}
                onChange={(e) => setInputs({...inputs,content: e.target.value})}
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
              onClick={handleCreate}
              className="btn btn-primary flex w-20"
            >
              Create
            </button>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default CreateNote;
