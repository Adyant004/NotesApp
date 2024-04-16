import { useEffect, useState } from "react";
import useNoteContext from "../zustand/useNoteContext";
import toast from "react-hot-toast";

const useGetNotes = () => {
    const [loading, setLoading] = useState(false);
    const { setNotes } = useNoteContext();

    useEffect(() => {
        const getNotes = async () => {
            setLoading(true);
            try {
                const res = await fetch('/api/notes');
                if (!res.ok) {
                    throw new Error("Failed to fetch notes");
                }
                const data = await res.json();
                setNotes(data);
            } catch (error: any) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        getNotes();
    }, [setNotes]); 

    return { loading };
};

export default useGetNotes;
