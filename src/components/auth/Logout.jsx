import { useNavigate } from "react-router-dom";
import LogoutImage from "../../assets/icons/logout.svg";
import useAuth from "../../hooks/useAuth";
const Logout = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const handleLogout = () => {
    // Perform logout logic here
    setAuth(null);
    navigate("/login");
  };

  return (
    <>
      <button className="icon-btn" onClick={handleLogout}>
        <img src={LogoutImage} alt="Logout" />
      </button>
    </>
  );
};

export default Logout;
