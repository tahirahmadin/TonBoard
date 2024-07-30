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
        // minHeight: "calc(100vh - 60px)",
        position: "relative",
        background: "#161811",
        paddingBottom: "100px",
        paddingLeft: "1%",
        paddingRight: "1%",
        zIndex: 0,
        overflowX: "hidden",
        overflowY: "hidden",
      }}
    >
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
            height: 52,
            background: "#000",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            backgroundColor: "#212121",
            borderRadius: 10,
            paddingLeft: 6,
            paddingRight: 6,
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
                  fontSize: 12,
                  color: tabValue === i ? "#64FF99" : "#FFFFFF",
                }}
              >
                {ele}
              </Typography>
            </Button>
          ))}
        </Box>
      </Box>

      {tabValue === 0 && (
        <Box style={{ height: "80vh", overflowY: "hidden" }}>
          <Grid container spacing={1} mt={1}>
            <Grid item xs={6} md={6}>
              <WorkCard2
                poolId={0}
                title={"EON TASKS"}
                img="https://cdn3d.iconscout.com/3d/premium/thumb/cash-bonus-on-online-shopping-11964562-9764218.png?f=webp"
                sub_heading1="200 $TON"
                sub_heading2="Tokens Pool"
                description="Complete social tasks & earn points."
                color1="#4886FF"
                color2="#03429F"
                disabled={false}
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
                disabled={true}
              />
            </Grid>
          </Grid>
          <Grid container spacing={1} mt={1}>
            <Grid item xs={6} md={6}>
              <WorkCard2
                title={"HAMSTER TASKS"}
                img="https://iq.wiki/cdn-cgi/image/width=3840,format=auto,quality=95/https://ipfs.everipedia.org/ipfs/QmZA8NbN22UoT23jmS5kT6te71Y3xiAEqymDZFV9MTT81N"
                sub_heading1="2000 $HMSTR"
                sub_heading2="Tokens Pool"
                description="Complete social tasks & earn points."
                color1="#4886FF"
                color2="#03429F"
                disabled={true}
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <WorkCard2
                title={"IO TASKS"}
                img="https://asset.brandfetch.io/id8qSsHGIA/id4L0DicYX.jpeg"
                sub_heading1="1000 $IO"
                sub_heading2="Tokens Pool"
                description="Complete social tasks & earn points."
                color1="#4886FF"
                color2="#03429F"
                disabled={true}
              />
            </Grid>
          </Grid>
        </Box>
      )}

      {tabValue != 0 && (
        <Box
          style={{
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "10vh",
          }}
        >
          <Typography
            style={{
              width: "90%",
              fontFamily: "Rubik",
              fontWeight: 600,
              fontSize: 18,
              lineHeight: "110%",
              textAlign: "center",
              color: "#ffffff",
            }}
          >
            Coming soon
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Work;
