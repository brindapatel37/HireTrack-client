import "./LoginPage.scss";
import React from "react";
import GuestHeader from "../../components/GuestHeader/GuestHeader";
import Footer from "../../components/Footer/Footer";
import Login from "../../components/Login/Login";

function LoginPage() {
  return (
    <>
      <div className="page">
        <GuestHeader />
        <div className="login-page">
          <Login />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default LoginPage;
