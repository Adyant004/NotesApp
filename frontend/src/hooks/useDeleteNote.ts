import { useState } from "react"
import toast from "react-hot-toast";
import useNoteContext from "../zustand/useNoteContext";


const useDeleteNote = () => {
    const [deleting,setDeleting] = useState(false);
    const { notes,setNotes,selectedNote,searchNote,setSearchNote } = useNoteContext();

    const Delete = async() => {
        setDeleting(true);
        try {
            const res = await fetch(`/api/notes/${selectedNote?._id}`,{
                method: "DELETE",
                headers: { "Content-Type" : "application/json" }
            })

            const data = await res.json();

            if(data.error) {
                throw new Error(data.error)
            }

            const nts : any = notes?.filter(nt => nt._id !== selectedNote?._id);
            setNotes(nts);
            if(searchNote?._id === selectedNote?._id) {
                setSearchNote(null)
            }
            toast.success('Note deleted successfully!');

        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setDeleting(false);
        }
    }

  return {deleting,Delete} 
}

export default useDeleteNote
