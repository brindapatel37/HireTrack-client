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
    <>
      <h1>Login</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault();

          setError(null);

          const username = e.target.username.value;
          const password = e.target.password.value;

          if (!username || !password) {
            alert("Please provide both the correct username and password");
            return;
          }

          // payload contains the token
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
            // set in localstorage...
            localStorage.setItem("token", token);
            // ...AND in the react state
            setToken(token);
            navigate("/jobs");
          } catch (e) {
            setError(e?.response?.data || "something went wrong");
          }
        }}
      >
        <input name="username" placeholder="usename" />
        <input name="password" placeholder="password" type="password" />
        <button>Login</button>
        {error && <div>{error}</div>}
      </form>
    </>
  );
}
