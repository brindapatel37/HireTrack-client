import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

import { baseURL } from "../../scripts/utils";
import React, { useState, useEffect } from "react";
import axios from "axios";

const StatusDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true); // New state to track loading status
  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#d0ed57"]; // Define the COLORS array

  async function fetchJobs() {
    try {
      const token = localStorage.getItem("token");
      console.log("Token:", token);

      const { data } = await axios.get(`${baseURL}/jobs`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setJobs(data);
      setLoading(false); // Set loading to false once data is fetched
    } catch (e) {
      console.log("Error fetching jobs list:", e);
      alert("Unable to fetch jobs list. Please try again.");
      setLoading(false); // Set loading to false even if there's an error
    }
  }

  useEffect(() => {
    fetchJobs();
  }, []);

  // Show loading message until jobs are fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  // Handle the case where no jobs are available
  if (!jobs || jobs.length === 0) {
    return <div>No jobs available</div>;
  }

  // Process the jobs for status count
  const statusCount = jobs.reduce((acc, job) => {
    acc[job.job_status] = (acc[job.job_status] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.keys(statusCount).map((status) => ({
    name: status,
    value: statusCount[status],
  }));

  // Define a color map for each status
  const colorMap = {
    Applied: "#8884d8",
    Interview: "#82ca9d",
    Offer: "#ffc658",
    Rejected: "#ff8042",
  };

  const customLegendFormatter = (value) => {
    return value === "value" ? "Status" : value; // Change "value" to "Status"
  };

  return (
    <>
      <div className="main__counter">
        <p className="main__count">Total Jobs: {jobs.length}</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            tick={({ x, y, payload }) => {
              const tickColor = colorMap[payload.value] || "#000000"; // Default color if not found in the map
              return (
                <text x={x} y={y} dy={16} textAnchor="middle" fill={tickColor}>
                  {payload.value}
                </text>
              );
            }}
          />
          <YAxis
            tickFormatter={(value) => `${value} jobs`}
            domain={[0, 5]}
            interval="preserveStartEnd"
            ticks={[0, 1, 2, 3, 4, 5]} //FIXto tickcount after demo FIXME:
          />
          <Legend formatter={customLegendFormatter} />{" "}
          {/* Apply the custom legend formatter */}
          <Bar dataKey="value">
            {chartData.map((entry, index) => (
              <Cell
                key={index}
                fill={colorMap[entry.name]} // Set color dynamically
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default StatusDashboard;
