import React, { useEffect, useState } from "react";
import Profile from "../components/Profile";
import { Box, Button, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { getDashboardData, getReferralsData } from "../actions/serverActions";
import useTelegramSDK from "../hooks/useTelegramSDK";
import Explainer from "../components/DashCard";
import FancyCard from "../components/DashCard";
import ProfileCard from "../components/ProfileCard";
import ProfileCard2 from "../components/ProfileCard2";

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
        paddingTop: "25px",
        paddingLeft: "1%",
        paddingRight: "1%",
        zIndex: 0,
      }}
    >
      <ProfileCard />
      {/* <ProfileCard2 /> */}

      {/* <Box display={"flex"} justifyContent={"center"}>
        <FancyCard />
      </Box> */}
      <img
        src="/images/bg_grid.png"
        alt="TaskDao"
        className="portrait"
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          zIndex: -1,
          top: 0,
          left: 0,
          objectFit: "cover",
        }}
      />
    </Box>
  );
};

export default Dashboard;
