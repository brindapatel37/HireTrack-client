import GuestHeader from "../../components/GuestHeader/GuestHeader";
import Footer from "../../components/Footer/Footer";
import "./RegisterPage.scss";
import React from "react";
import Register from "../../components/Register/Register";

function RegisterPage() {
  return (
    <div className="page">
      <GuestHeader />
      <div className="register-page">
        <div className="register-page__content">
          <h1 className="register-page__title">Welcome to HireTrack</h1>
          <p className="register-page__description">
            HireTrack helps job seekers effectively manage and track their job
            applications, interviews, and to-dos. Sign up to keep track of your
            job search, get personalized feedback on your resume, and stay
            organized.
          </p>
        </div>
        <div className="register-page__register">
          <Register />
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default RegisterPage;
