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
            applications, interviews, and to-dos.
            <p>
              {" "}
              Sign up to keep track of your job search, get personalized
              feedback on your resume, and stay organized.
            </p>
          </p>
        </div>
        <div className="register-page__register">
          <Register />
        </div>
        <div className="register-page__extra">
          <p className="register-page__extra-description">
            Welcome to HireTrack – the app designed to help job seekers. By
            signing up, you’ll be able to:
          </p>
          <div className="register-page__extra-cards">
            <div className="register-page__extra-card">
              <span className="register-page__extra-card__span">
                Track Your Progress
              </span>
              <p className="register-page__extra-card__description">
                Track job applications with categorized statuses and deadlines.
              </p>
            </div>
            <div className="register-page__extra-card">
              <span className="register-page__extra-card__span">
                Resume Feedback
              </span>
              <p className="register-page__extra-card__description">
                Input your resume text and job description to receive
                professional feedback powered by GenAI.
              </p>
            </div>
            <div className="register-page__extra-card">
              <span className="register-page__extra-card__span">
                Stay on Top of Tasks
              </span>
              <p className="register-page__extra-card__description">
                Use the built-in to-do list feature to organize your job search
                tasks and never miss an important deadline.
              </p>
            </div>
            <div className="register-page__extra-card">
              <span className="register-page__extra-card__span">
                Access Securely
              </span>
              <p className="register-page__extra-card__description">
                Access all of this securely, with your own personalized
                dashboard.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default RegisterPage;
