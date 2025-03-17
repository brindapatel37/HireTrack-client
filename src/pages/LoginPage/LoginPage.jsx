import "./LoginPage.scss";
// import { baseURL } from "../../scripts/utils";
import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
import GuestHeader from "../../components/GuestHeader/GuestHeader";
import Footer from "../../components/Footer/Footer";

function LoginPage() {
  return (
    <>
      <GuestHeader />
      <h1> HI this is login </h1>
      <Footer />
    </>
  );
}

export default LoginPage;
