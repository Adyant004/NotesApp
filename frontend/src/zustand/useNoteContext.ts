import { create } from "zustand";

interface Note {
    heading: string;
    content: string;
    creatorId: string;
    createdAt: string;
    updatedAt: string;
    _id: string;
}

interface NoteState {
    notes: Note[] | null;
    selectedNote: Note | null;
    searchNote: Note | null;
}

interface NoteActions {
    setNotes: (notes: Note[] | null) => void;
    setSelectedNote: (selectedNote: Note | null) => void;
    setSearchNote: (searchNote: Note | null) => void;
}

interface NoteInterface extends NoteState, NoteActions {}

const useNoteContext = create<NoteInterface>((set) => ({
    notes: [],
    setNotes: (notes) => set({ notes }),
    selectedNote: null,
    setSelectedNote: (selectedNote) => set({ selectedNote }),
    searchNote: null,
    setSearchNote: (searchNote) => set({ searchNote })
}));

export default useNoteContext;
