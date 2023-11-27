import logo from "./logo-32x32.png";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/AuthProvider";

const NavBar = () => {
  const { token, handleLogout } = useAuth();
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <Link class="navbar-brand" to="/">
        <h4>
          <img src={logo} alt="logo" /> Talk To Me
        </h4>
      </Link>

      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <Link class="nav-link" to="/">
              Home
            </Link>
          </li>

          {token ? (
            <>
              <li class="nav-item">
                <Link class="nav-link" to="/profile">
                  Profile
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/talktome">
                  Talk to me
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/ihearyou">
                  I hear you
                </Link>
              </li>
              <li class="nav-item">
                <button class=" btn btn-success" onClick={handleLogout}>
                  log out
                </button>
              </li>
            </>
          ) : (
            <>
              <li class="nav-item">
                <Link class="nav-link" to="/register">
                  Register
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/login">
                  Login
                </Link>
              </li>
            </>
          )}
        </ul>
        {/* {token ? (
          <form class="form-inline my-2 my-lg-0">
            <input
              class="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
              Search
            </button>
          </form>
        ) : null} */}
      </div>
    </nav>
  );
};

export default NavBar;
