import GuestHeader from "../../components/GuestHeader/GuestHeader";
import Footer from "../../components/Footer/Footer";
import "./RegisterPage.scss";
// import { baseURL } from "../../scripts/utils";
import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";

function RegisterPage() {
  return (
    <>
      <GuestHeader />
      <h1> HI this is register </h1>
      <Footer />
    </>
  );
}

export default RegisterPage;
