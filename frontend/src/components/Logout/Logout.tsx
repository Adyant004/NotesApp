import useLogout from "../../hooks/useLogout";

const Logout = () => {
  const { loading, logout } = useLogout();

  return (
    <>
      {loading ? (
        <span className="loading loading-dots loading-xs"></span>
      ) : (
        <button
          onClick={logout}
          className="btn btn-primary flex w-20 font-Signika"
        >
          Logout
        </button>
      )}
    </>
  );
};

export default Logout;
