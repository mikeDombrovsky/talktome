// import logo from "./logo.svg";
import { Link } from "react-router-dom";

const NavBar = () => {
  const { token, handleLogout, handleLogin } = useAuth();
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">
        {/* <img src={logo} alt="logo" width={100} /> */}
        <h4>Talk To Me</h4>
      </a>

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
          <li class="nav-item">
            <Link class="nav-link" to="/register">
              Register
            </Link>
          </li>

          {token ? (
            <li class="nav-item">
              <button class=" btn btn-success">log out</button>
            </li>
          ) : (
            <li class="nav-item">
              <Link class="nav-link" to="/login">
                Login
              </Link>
            </li>
          )}
        </ul>
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
      </div>
    </nav>
  );
};

export default NavBar;
