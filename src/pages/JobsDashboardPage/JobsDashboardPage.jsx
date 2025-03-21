import "./JobsDashboardPage.scss";
import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import StatusDashboard from "../../components/DashboardView/DashboardView";
import TasksWidget from "../../components/TasksWidget/TasksWidget";

function JobsDashboardPage() {
  return (
    <>
      <div className="page">
        <Header />
        <div className="jobsdashboard-page">
          <h2 className="welcome">Welcome to your Jobs Dashboard!</h2>
          <TasksWidget />
          <StatusDashboard />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default JobsDashboardPage;
