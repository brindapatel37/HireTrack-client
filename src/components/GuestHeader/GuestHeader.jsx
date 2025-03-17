import "./GuestHeader.scss";
import logo from "../../assets/logo/HIRETRACK.png";
import { Link, NavLink } from "react-router-dom";

const GuestHeader = () => {
  return (
    <>
      <div className="gst-nav">
        <nav className="gst-nav__wrap">
          <div className="gst-nav__logo">
            <Link className="gst-nav__link" to="/login">
              <img
                src={logo}
                alt="HireTrack Logo"
                className="gst-nav__link--img"
              />
              <h1 className="gst-nav__link--desc"> HireTrack</h1>
            </Link>
          </div>
          <div className="gst-nav__links">
            <div className="gst-nav__text-links">
              <NavLink
                to="/register"
                activeClassName="active"
                className="gst-nav__navlink"
              >
                <div className="gst-nav__text">Register</div>
              </NavLink>
              <NavLink
                to="/login"
                activeClassName="active"
                className="gst-nav__navlink"
              >
                <div className="gst-nav__text">Login</div>
              </NavLink>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default GuestHeader;
