import { motion } from "framer-motion";
import { FC, FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";

const Login: FC = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const { loading, login } = useLogin();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    if (loading) return;
    await login(inputs);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -150 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -150 }}
        transition={{ duration: 0.4, ease: "linear" }}
        className="flex p-4 gap-2 flex-col justify-center items-center min-w-96 mx-auto rounded-lg font-Signika"
      >
        <motion.h1
          initial={{ opacity: 0, y: -150 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -150 }}
          transition={{ duration: 0.4, ease: "linear" }}
          className="font-semibold text-3xl text-center"
        >
          Login
        </motion.h1>

        <motion.form
          initial={{ opacity: 0, y: 150 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 150 }}
          transition={{ duration: 0.4, ease: "linear" }}
          className="w-full"
          onSubmit={handleLogin}
        >
          <div className="flex flex-col flex-grow flex-1 w-full gap-2">
            <motion.label
              initial={{ opacity: 0, x: -150 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, y: -150 }}
              transition={{ duration: 0.4, ease: "linear" }}
              className="input input-bordered flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input
                value={inputs.username}
                onChange={(e) =>
                  setInputs({ ...inputs, username: e.target.value })
                }
                type="text"
                className="grow"
                placeholder="Username"
              />
            </motion.label>
            <motion.label
              initial={{ opacity: 0, x: -150 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, y: -150 }}
              transition={{ duration: 0.4, ease: "linear" }}
              className="input input-bordered flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                value={inputs.password}
                onChange={(e) =>
                  setInputs({ ...inputs, password: e.target.value })
                }
                type="password"
                className="grow"
                placeholder="Password"
              />
            </motion.label>
            <motion.div
              initial={{ opacity: 0, x: -150 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, y: -150 }}
              transition={{ duration: 0.4, ease: "linear" }}
            >
              <Link
                to="/signup"
                className="text-sm hover:underline cursor-pointer hover:text-blue-500 mt-2 inline-block"
              >
                Don't have an account?
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -150 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, y: -150 }}
              transition={{ duration: 0.4, ease: "linear" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95, rotate: "-2.5deg" }}
              className="flex justify-center "
            >
              <button className="btn btn-primary w-36">
                {loading ? (
                  <span className="loading loading-dots loading-xs"></span>
                ) : (
                  "Log in"
                )}
              </button>
            </motion.div>
          </div>
        </motion.form>
      </motion.div>
    </>
  );
};

export default Login;
