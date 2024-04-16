import { FormEvent, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoIosClose } from "react-icons/io";
import useNoteContext from "../../zustand/useNoteContext";
import toast from "react-hot-toast";

const Search = () => {
  const [search,setSearch] = useState('');
  const { notes,searchNote,setSearchNote } = useNoteContext();
  
  const handleSearch = async(e : FormEvent) => {
    e.preventDefault();
    if(!search) return;
    const note = notes?.find((n) => n.heading.toLowerCase().includes(search.toLowerCase()));
    if(note) {
      setSearchNote(note);
    } else {
      toast.error('Note not found')
      setSearchNote(null);
    }
  }

  const handleClose = () =>{
      setSearch('');
      setSearchNote(null);
  }

  console.log(searchNote)

  return (
    <>
      <div className="flex items-center gap-2 font-Signika">
      <CiSearch onClick={handleSearch} className="text-neutral-content cursor-pointer" size={40} />
      <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Search heading" className="input h-10 input-bordered w-full max-w-xs" />
      {
        search && (<IoIosClose onClick={handleClose} className="text-neutral-content cursor-pointer" size={40} />)
      }
      </div>
    </>
  );
};

export default Search;
