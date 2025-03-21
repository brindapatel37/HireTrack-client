import "./Register.scss";
import { baseURL } from "../../scripts/utils";
import React, { useState } from "react";
import axios from "axios";

function Register() {
  const [Registered, setRegistered] = useState(false);
  const [error, setError] = useState(null);
  //
  return (
    <>
      <h1>Register for HireTrack!</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault();

          setError(null);
          setRegistered(false);

          const name = e.target.name.value;
          const username = e.target.username.value;
          const password = e.target.password.value;
          if (!username || !name || !password) {
            alert("You need to provide all 3 pieces of information. Try again");
            return;
          }

          try {
            // all we do here is signup.
            await axios.post(`${baseURL}/user/register`, {
              name,
              username,
              password,
            });
            setRegistered(true);
          } catch (e) {
            console.log(e);
            setError(e?.response?.data);
          }
        }}
      >
        <input name="name" placeholder="name" />
        <input name="username" placeholder="usename" />
        <input name="password" placeholder="password" type="password" />
        <button>submit</button>
        {Registered && (
          <div> Sign up successful, please login to HireTrack </div>
        )}
        {error && <div>{error}</div>}
      </form>
    </>
  );
}

export default Register;
