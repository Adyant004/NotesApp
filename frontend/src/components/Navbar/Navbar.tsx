import { FC, useEffect, useState } from "react";
import Search from "../Search/Search";
import CreateNote from "../Create/CreateNote";
import Logout from "../Logout/Logout";
import { motion } from "framer-motion";
import useAuthContext from "../../zustand/useAuthContext";

const Navbar: FC = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("data-theme")
      ? localStorage.getItem("data-theme")
      : "light"
  );

  const handleToggle = (e: any) => {
    if (e.target.checked) {
      setTheme("night");
    } else {
      setTheme("cupcake");
    }
  };

  useEffect(() => {
    localStorage.setItem("data-theme", theme || "");
    const localTheme: string = localStorage.getItem("data-theme") || "";
    if (localTheme) {
      document.querySelector("html")?.setAttribute("data-theme", localTheme);
    }
  }, [theme]);

  const { authUser } = useAuthContext();

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -150 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -150 }}
        transition={{ duration: 0.4, ease: "linear" }}
        className="navbar bg-neutral justify-between p-2"
      >
        <button className="btn btn-ghost text-neutral-content text-xl">NotesApp</button>
        <motion.div
          initial={{ opacity: 0, x: 150 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 150 }}
          transition={{ duration: 0.4, ease: "linear" }}
          className="gap-2"
        >
          {authUser && (
            <>
              <Search />
              <CreateNote />
              <Logout />
            </>
          )}
          <label className="swap swap-rotate">
            <input
              type="checkbox"
              onChange={handleToggle}
              checked={theme === "cupcake" ? false : true}
            />

            <svg
              className="swap-off fill-current w-10 h-10 text-neutral-content"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>

            <svg
              className="swap-on fill-current w-10 h-10"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Navbar;
