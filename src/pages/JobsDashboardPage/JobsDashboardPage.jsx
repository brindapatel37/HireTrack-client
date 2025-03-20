import "./JobsDashboardPage.scss";
import { baseURL } from "../../scripts/utils";
import React, { useState, useEffect } from "react";
import axios from "axios";
// import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import StatusDashboard from "../../components/DashboardView/DashboardView";

function JobsDashboardPage() {
  return (
    <>
      <Header />
      <h1> HI Jobs Dashboard Page </h1>

      <StatusDashboard />
      <Footer />
    </>
  );
}

export default JobsDashboardPage;
