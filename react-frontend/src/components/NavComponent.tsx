import "../assets/styles/nav.css";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";

const NavComponent = () => {
  const userContext = useUserContext();
  const navigate = useNavigate();

  const signOut = () => {
    userContext.signOut();
    navigate("/");
  };

  return (
    <nav>
      <Link to="/" className="nav-home">
        Job Listings
      </Link>
      {userContext.username === "" ? (
        <Link to="/login" className="nav-login">
          Login
        </Link>
      ) : (
        <div className="nav-login" onClick={signOut}>
          Sign Out: {userContext.username}
        </div>
      )}
    </nav>
  );
};

export default NavComponent;
