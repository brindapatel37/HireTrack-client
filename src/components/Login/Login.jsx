import axios from "axios";
import React, { useState } from "react";
import { baseURL } from "../../scripts/utils";
import "./Login.scss";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <div className="login">
      <div className="login__header">
        <h1 className="login__title">Welcome Back to HireTrack!</h1>
        <p className="login__body">
          Welcome back! Log in to access your personalized dashboard, track your
          job applications, and get instant feedback on your resume.
          <p> Stay organized and never miss a follow-up or deadline again.</p>
        </p>
      </div>
      <div className="login__box">
        <h2 className="login__subheading">Log in to manage your job search!</h2>
        <form
          className="login__form"
          onSubmit={async (e) => {
            e.preventDefault();

            setError(null);

            const username = e.target.username.value;
            const password = e.target.password.value;

            if (!username || !password) {
              alert("Please provide both the correct username and password");
              return;
            }

            try {
              const { data } = await axios.post(
                `${baseURL}/user/login`,
                {
                  username,
                  password,
                },
                {
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );

              const { token } = data;
              localStorage.setItem("token", token);
              setToken(token);
              navigate("/jobs");
            } catch (e) {
              setError(e?.response?.data || "Something went wrong");
            }
          }}
        >
          <div className="login__input-container">
            <input
              name="username"
              placeholder="Username"
              className="login__input"
              required
            />
          </div>
          <div className="login__input-container">
            <input
              name="password"
              placeholder="Password"
              type="password"
              className="login__input"
              required
            />
          </div>
          <button className="login__submit-btn">Login</button>
          {error && <div className="login__error-message">{error}</div>}
        </form>
      </div>
    </div>
  );
}
