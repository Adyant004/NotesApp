import { FC, useRef } from "react";
import Card from "./Card";
import useGetNotes from "../../hooks/useGetNotes";
import useNoteContext from "../../zustand/useNoteContext";

const Home: FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  const { loading } = useGetNotes();
  const { notes, searchNote } = useNoteContext();

  return (
    <>
      {loading &&
        [...Array(3)].map((_, idx) => (
          <div key={idx} className="skeleton w-96 h-60"></div>
        ))}

      {searchNote ? (
        <div
          ref={ref}
          className="flex p-4 gap-2 items-center justify-center w-full"
        >
          <Card note={searchNote} reference={ref} />
        </div>
      ) : (
        <div
          ref={ref}
          className="flex p-4 flex-wrap gap-2 items-center justify-between w-full h-screen"
        >
          {notes?.map((note, idx) => (
            <Card key={idx} note={note} reference={ref} />
          ))}
        </div>
      )}
    </>
  );
};

export default Home;
