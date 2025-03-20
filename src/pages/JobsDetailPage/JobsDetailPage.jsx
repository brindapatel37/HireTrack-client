import "./JobsDetailPage.scss";
// import { baseURL } from "../../scripts/utils";
import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import JobDetails from "../../components/JobDetails/JobDetails";
function JobsDetailPage() {
  return (
    <>
      <Header />
      <JobDetails />
      <Footer />
    </>
  );
}

export default JobsDetailPage;
