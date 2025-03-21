import "./Register.scss";
import { baseURL } from "../../scripts/utils";
import React, { useState } from "react";
import axios from "axios";

function Register() {
  const [Registered, setRegistered] = useState(false);
  const [error, setError] = useState(null);
  const formRef = React.useRef();
  return (
    <>
      <div className="register">
        <h1 className="register__title">Register for HireTrack!</h1>
        <form
          ref={formRef}
          className="register__form"
          onSubmit={async (e) => {
            e.preventDefault();

            setError(null);
            setRegistered(false);

            const name = e.target.name.value;
            const username = e.target.username.value;
            const password = e.target.password.value;
            if (!username || !name || !password) {
              alert(
                "You need to provide all 3 pieces of information. Try again"
              );
              return;
            }

            try {
              await axios.post(`${baseURL}/user/register`, {
                name,
                username,
                password,
              });
              setRegistered(true);
              formRef.current.reset();
            } catch (e) {
              console.log(e);
              setError(e?.response?.data);
            }
          }}
        >
          <div className="register__input-container">
            <input
              name="name"
              placeholder="Name"
              className="register__input"
              required
            />
          </div>
          <div className="register__input-container">
            <input
              name="username"
              placeholder="Username"
              className="register__input"
              required
            />
          </div>
          <div className="register__input-container">
            <input
              name="password"
              placeholder="Password"
              type="password"
              className="register__input"
              required
            />
          </div>
          <button className="register__submit-btn">Submit</button>
          {Registered && (
            <div className="register__success-message">
              Sign up successful, please login to HireTrack.
            </div>
          )}
          {error && <div className="register__error-message">{error}</div>}
        </form>
      </div>
    </>
  );
}

export default Register;
