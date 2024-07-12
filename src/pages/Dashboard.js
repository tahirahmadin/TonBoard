import React, { useEffect, useState } from "react";
import Profile from "../components/Profile";
import { Box, Button, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { getDashboardData, getReferralsData } from "../actions/serverActions";
import useTelegramSDK from "../hooks/useTelegramSDK";
import Explainer from "../components/DashCard";
import FancyCard from "../components/DashCard";
import ProfileCard from "../components/ProfileCard";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({});

  // API call: to fetch tasks
  useEffect(() => {
    async function asyncFn() {
      let res = await getDashboardData();
      if (res) {
        setDashboardData(res);
      }
    }
    asyncFn();
  }, []);

  return (
    <Box
      style={{
        width: "100%",
        minHeight: "calc(100vh - 60px)",
        position: "relative",
        background: "#161811",
        paddingTop: 25,
        paddingLeft: "1%",
        paddingRight: "1%",
        zIndex: 0,
      }}
    >
      <ProfileCard />
    </Box>
  );
};

export default Dashboard;
