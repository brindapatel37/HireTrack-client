import "./Header.scss";
import logo from "../../assets/logo/HIRETRACK.png";
import { Link, NavLink } from "react-router-dom";
import home from "../../assets/icons/home.svg";

const Header = () => {
  return (
    <>
      <div className="nav">
        <nav className="nav__wrap">
          <div className="nav__logo">
            <Link className="nav__link" to="/">
              <img src={logo} alt="HireTrack Logo" className="nav__link--img" />
              <h1 className="nav__link--desc"> HireTrack</h1>
            </Link>
          </div>
          <div className="nav__links">
            <NavLink
              to="/jobs"
              activeClassName="active-home"
              className="nav__navlink"
            >
              <img src={home} alt="Home icon" className="nav__home" />
            </NavLink>
            <NavLink
              to="/jobs/dashboard"
              activeClassName="active"
              className="nav__navlink"
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/resume"
              activeClassName="active"
              className="nav__navlink"
            >
              Resume Help
            </NavLink>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
