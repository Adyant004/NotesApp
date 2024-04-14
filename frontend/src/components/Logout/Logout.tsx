import { Link } from "react-router-dom";

const Logout = () => {
  return (
    <>
      <Link to={'/login'} className="btn btn-primary flex w-20 font-Signika">Logout</Link>
    </>
  );
};

export default Logout;
