import { useState } from "react"
import toast from "react-hot-toast";
import useNoteContext from "../zustand/useNoteContext";

type createInterface = {
    heading?: string,
    content: string
}

const useCreateNote = () => {

    const [loading,setLoading] = useState(false);
    const { notes,setNotes } = useNoteContext();

    const create = async({heading,content} : createInterface) => {

        if(!content) {
            toast.error("Content cannot be empty!")
            return;
        }

        if(!heading) {
            heading = "Untitled Note"
        }

        setLoading(true);
        try {
            const res = await fetch('/api/notes',{
                method: "POST",
                headers: { "Content-Type" : "application/json" },
                body: JSON.stringify({ heading,content })
            })

            const data = await res.json();

            if(data.message) {
                throw new Error(data.message);
            }

            if(notes) {
                setNotes([...notes,data])
            } else {
                setNotes([data]);
            }
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

  return {loading,create} 
}

export default useCreateNote
