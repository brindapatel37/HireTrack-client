import "./Header.scss";
import logo from "../../assets/logo/HIRETRACK.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import home from "../../assets/icons/home.svg";
import React, { useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"));

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
                className={({ isActive }) =>
                  isActive ? "nav__navlink active" : "nav__navlink"
                }
              >
                <div className="nav__text">Dashboard</div>
              </NavLink>
              <NavLink
                to="/resume"
                className={({ isActive }) =>
                  isActive ? "nav__navlink active" : "nav__navlink"
                }
              >
                <div className="nav__text">Resume Help</div>
              </NavLink>
              <NavLink
                to="/login"
                className={"nav__navlink"}
                onClick={() => {
                  localStorage.removeItem("token");
                  setToken(null);
                }}
              >
                <div className="nav__text--logout">Logout</div>
              </NavLink>
            </div>
            <NavLink
              to="/jobs"
              className={({ isActive }) =>
                isActive ? "nav__navlink active" : "nav__navlink"
              }
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
