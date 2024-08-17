import React, { useEffect, useState } from "react";
import Profile from "../components/Profile";
import { Box, Button, Grid, Grow, Typography, Zoom } from "@mui/material";
import { getDashboardData } from "../actions/serverActions";
import useTelegramSDK from "../hooks/useTelegramSDK";

import SingleProjectCard from "../components/SingleProjectCard";
import { PROJECTS_DATA } from "../utils/constants";

const Work = () => {
  const { viberate } = useTelegramSDK();

  const [dashboardData, setDashboardData] = useState({});
  const [tabValue, setTabValue] = useState(0);

  const topTabs = ["Social", "Airdrop", "Testnet"];

  // API call: to fetch tasks
  // useEffect(() => {
  //   async function asyncFn() {
  //     let res = await getDashboardData();
  //     if (res) {
  //       setDashboardData(res);
  //     }
  //   }
  //   asyncFn();
  // }, []);

  return (
    <Box
      style={{
        width: "100%",
        height: "90vh",
        position: "relative",
        background: "#000000",
        paddingBottom: "100px",
        paddingLeft: "4%",
        paddingRight: "4%",
        paddingTop: "5%",
        zIndex: 0,
        overflowX: "hidden",
        overflowY: "hidden",
      }}
    >
      <Typography
        mb={1}
        style={{
          width: "100%",
          fontFamily: "Rubik",
          fontWeight: 600,
          fontSize: 20,
          lineHeight: "130%",
          textAlign: "left",
          color: "#ffffff",
        }}
      >
        Latest Projects
      </Typography>

      <Grow direction="down" in={true}>
        <Box style={{ height: "80vh", overflowY: "hidden" }}>
          {PROJECTS_DATA.map((ele) => (
            <SingleProjectCard
              projectId={ele.id}
              title={ele.projectName}
              description={ele.description}
              category={ele.category}
              img={ele.logo}
            />
          ))}
        </Box>
      </Grow>
    </Box>
  );
};

export default Work;
