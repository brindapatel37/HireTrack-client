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
            <Link className="nav__link" to="/jobs">
              <img src={logo} alt="HireTrack Logo" className="nav__link--img" />
              <h1 className="nav__link--desc"> HireTrack</h1>
            </Link>
          </div>
          <div className="nav__links">
            <div className="nav__text-links">
              <NavLink
                to="/jobs/dashboard"
                activeClassName="active"
                className="nav__navlink"
              >
                <div className="nav__text">Dashboard</div>
              </NavLink>
              <NavLink
                to="/resume"
                activeClassName="active"
                className="nav__navlink"
              >
                <div className="nav__text">Resume Help</div>
              </NavLink>
            </div>
            <NavLink
              to="/jobs"
              activeClassName="active"
              className="nav__navlink"
              end
            >
              <div className="nav__icon">
                <img src={home} alt="Home icon" className="nav__home" />
              </div>
            </NavLink>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
