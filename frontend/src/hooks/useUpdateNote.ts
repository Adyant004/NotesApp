import { useState } from "react"
import toast from "react-hot-toast";
import useNoteContext from "../zustand/useNoteContext";



const useUpdateNote = () => {
    const [loading,setLoading] = useState(false);
    const { notes,setNotes,selectedNote,searchNote,setSearchNote } = useNoteContext();

    const update = async(heading?: string,content?: string) => {

        if(!content) {
            toast.error('Content cannot be empty!')
            return;
        }

        if(!heading) {
            heading = "Untitled Note";
        }

        console.log(selectedNote?._id);
        setLoading(true);
        try {
            const res = await fetch(`/api/notes/${selectedNote?._id}`,{
                method: "PATCH",
                headers: { "Content-Type" : "application/json" },
                body: JSON.stringify({ heading,content })
            })

            const data = await res.json();

            if(data.message) {
                throw new Error(data.message)
            }

            const idx: number | undefined = notes?.findIndex(note => note._id === data._id);

            if (idx !== undefined && notes) {
                const updatedNotes = [...notes];
                updatedNotes[idx] = {
                    ...updatedNotes[idx],
                    heading: data.heading,
                    content: data.content
                };
                setNotes(updatedNotes);
                if(searchNote?._id === selectedNote?._id) {
                    setSearchNote(data);
                }
                toast.success('Note updated successfully!');
            } else {
                toast.error('Note not found!');
            }
        } catch (error : any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

  return {loading,update}
}

export default useUpdateNote
