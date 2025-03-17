import "./Footer.scss";
import { Link, NavLink } from "react-router-dom";
import email from "../../assets/icons/ic--round-email.svg";
import linkedin from "../../assets/icons/mdi--linkedin.svg";
import github from "../../assets/icons/fa-brands--github-square.svg";
import logo from "../../assets/logo/HIRETRACK.png";
import js from "../../assets/icons/simple-icons--javascript.svg";
import node from "../../assets/icons/simple-icons--nodedotjs.svg";
import react from "../../assets/icons/simple-icons--react.svg";
import express from "../../assets/icons/devicon--express.svg";
import knex from "../../assets/icons/logos--knex.svg";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__logo">
        <Link className="footer__link" to="/jobs">
          <img src={logo} alt="HireTrack Logo" className="footer__link--img" />
          <h3 className="footer__link--desc"> HireTrack</h3>
        </Link>
      </div>
      <div className="footer__connect">
        {/* <h3 className="footer__desc"> Let's Connect</h3> */}
        <div className="footer__socials">
          <a
            href="mailto:brinda.patel.brinda@gmail.com"
            className="footer__icon"
          >
            <img className="footer__img" src={email} alt="email icon" />
          </a>
          <a
            href="https://www.linkedin.com/in/brindapatel09/"
            className="footer__icon"
          >
            <img className="footer__img" src={linkedin} alt="LinkedIn icon" />
          </a>
          <a href="https://github.com/brindapatel37" className="footer__icon">
            <img className="footer__img--gh" src={github} alt="GitHub icon" />
          </a>
        </div>
      </div>
      <div className="footer__content">
        <p className="footer__desc2">built on & powered by </p>
        <div className="footer__icons">
          <img className="footer__img2" src={react} alt="React icon" />
          <img className="footer__img2" src={node} alt="Node JS icon" />
          <img className="footer__img2" src={js} alt="Javascript icon" />
          <img className="footer__img2" src={express} alt="Express icon" />
          <img className="footer__img2" src={knex} alt="Knex icon" />
        </div>
      </div>
      <div className="footer__boiler">
        <p className="footer__info">&copy; 2025 HireTrack</p>
        <p className="footer__info">. Terms</p>
        <p className="footer__info">Privacy</p>
        <p className="footer__info">Cookies</p>
      </div>
    </footer>
  );
};

export default Footer;
