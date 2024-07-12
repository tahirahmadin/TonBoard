import React, { useEffect, useState } from "react";
import Profile from "../components/Profile";
import { Box, Button, Grid, Typography } from "@mui/material";
import { getDashboardData } from "../actions/serverActions";
import useTelegramSDK from "../hooks/useTelegramSDK";

import WorkCard from "../components/WorkCard";
import WorkCard2 from "../components/WorkCard2";

const Work = () => {
  const { viberate } = useTelegramSDK();

  const [dashboardData, setDashboardData] = useState({});
  const [tabValue, setTabValue] = useState(0);

  const topTabs = ["Premium", "Variable", "Free"];

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
        paddingBottom: "100px",
        paddingTop: "25px",
        paddingLeft: "1%",
        paddingRight: "1%",
        zIndex: 0,
      }}
    >
      <Profile />
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "transparent",
        }}
      >
        <Box
          style={{
            marginTop: 10,
            width: "90%",
            height: 45,
            background: "#000",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            backgroundColor: "#212121",
            borderRadius: 10,
            paddingLeft: 5,
            paddingRight: 5,
          }}
        >
          {topTabs.map((ele, i) => (
            <Button
              key={i}
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                position: "relative",
                backgroundColor: tabValue === i ? "black" : "transparent",
                borderRadius: 10,
                height: 40,
              }}
              onClick={() => {
                viberate("light");
                setTabValue(i);
              }}
            >
              <Typography
                variant="body1"
                textTransform={"Capitalize"}
                style={{
                  fontWeight: tabValue === i ? 700 : 400,
                  fontSize: 11,
                  color: tabValue === i ? "#64FF99" : "#FFFFFF",
                }}
              >
                {ele}
              </Typography>
            </Button>
          ))}
        </Box>
      </Box>
      <Grid container spacing={1} mt={1}>
        <Grid item xs={6} md={6}>
          <WorkCard2
            title={"API3 TASKS"}
            img="https://cryptologos.cc/logos/api3-api3-logo.png"
            sub_heading1="5000 $API3"
            sub_heading2="Tokens Pool"
            description="Complete social tasks & earn points."
            color1="#4886FF"
            color2="#03429F"
          />
        </Grid>
        <Grid item xs={6} md={6}>
          <WorkCard2
            title={"API3 TASKS"}
            img="https://cryptologos.cc/logos/api3-api3-logo.png"
            sub_heading1="1000 $API3"
            sub_heading2="Tokens Pool"
            description="Complete social tasks & earn points."
            color1="#4886FF"
            color2="#03429F"
          />
        </Grid>
      </Grid>
      <Grid container spacing={1} mt={1}>
        <Grid item xs={6} md={6}>
          <WorkCard2
            title={"API3 TASKS"}
            img="https://cryptologos.cc/logos/api3-api3-logo.png"
            sub_heading1="5000 $API3"
            sub_heading2="Tokens Pool"
            description="Complete social tasks & earn points."
            color1="#4886FF"
            color2="#03429F"
          />
        </Grid>
        <Grid item xs={6} md={6}>
          <WorkCard
            title={"API3 TASKS"}
            img="https://cryptologos.cc/logos/api3-api3-logo.png"
            sub_heading1="1000 $API3"
            sub_heading2="Tokens Pool"
            description="Complete social tasks & earn points."
            color1="#4886FF"
            color2="#03429F"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Work;
