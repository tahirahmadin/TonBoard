import React, { useEffect, useState } from "react";
import Profile from "../components/Profile";
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useSelector } from "react-redux";
import { getDashboardData, getReferralsData } from "../actions/serverActions";
import useTelegramSDK from "../hooks/useTelegramSDK";
import Explainer from "../components/DashCard";
import FancyCard from "../components/DashCard";
import ProfileCard from "../components/ProfileCard";
import { Wallet } from "@mui/icons-material";

import makeStyles from "@mui/styles/makeStyles";
import ScoreComp from "../components/Score";

const useStyles = makeStyles((theme) => ({
  description: {
    width: "100%",
    textAlign: "center",
    fontSize: 16,
    lineHeight: "130%",
    color: "rgba(253, 255, 245, 0.8)",
    position: "relative",
    zIndex: 1,
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const score = useSelector((state) => state.ui.score);

  const [dashboardData, setDashboardData] = useState({});

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
        minHeight: "calc(100vh - 60px)",
        position: "relative",
        background: "#161811",
        zIndex: 0,
      }}
    >
      <Box
        style={{
          position: "relative",
          height: 200,
          backgroundImage:
            "url(https://plus.unsplash.com/premium_photo-1685114647471-46f2fc552bd9?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          borderBottomLeftRadius: "60%",
          borderBottomRightRadius: "60%",
        }}
      >
        <Box
          style={{
            position: "absolute",
            bottom: -30,
            left: "40%",
            backgroundColor: "white",
            borderRadius: "50%",
          }}
        >
          <img
            src={
              "https://cdn3d.iconscout.com/3d/premium/thumb/jewish-man-avatar-10971658-8779370.png?f=webp"
            }
            alt="TaskDao"
            width={70}
            height={70}
          />
        </Box>
      </Box>
      <Box pt={5}>
        <Typography
          style={{
            width: "100%",
            fontFamily: "'Rubik'",
            fontWeight: 700,
            fontSize: 21,
            lineHeight: "110%",
            textAlign: "center",
            color: "#ffffff",
            marginTop: "10px",
          }}
        >
          Tahir Ahmad
        </Typography>

        <Typography
          className={classes.description}
          style={{
            textAlign: "center",
          }}
        >
          Manager
        </Typography>
      </Box>

      <Box
        display={"flex"}
        flexDirection="row"
        justifyContent={"space-around"}
        alignItems={"center"}
        style={{
          borderRadius: "22px",
          paddingTop: 30,
          paddingBottom: 10,
        }}
      >
        <Box
          display={"flex"}
          flexDirection="column"
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography
            style={{
              width: "100%",
              fontFamily: "Rubik",
              fontWeight: 700,
              fontSize: 21,
              lineHeight: "110%",
              textAlign: "center",
              color: "#ffffff",
              marginTop: "4px",
            }}
          >
            0
          </Typography>
          <Typography
            style={{
              width: "100%",
              fontFamily: "Rubik",
              fontWeight: 400,
              fontSize: 14,
              lineHeight: "110%",
              textAlign: "center",
              color: "#64FF99",
            }}
          >
            Tasks
          </Typography>
        </Box>
        <Box
          display={"flex"}
          flexDirection="column"
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography
            style={{
              width: "100%",
              fontFamily: "Rubik",
              fontWeight: 700,
              fontSize: 21,
              lineHeight: "110%",
              textAlign: "center",
              color: "#ffffff",
              marginTop: "10px",
            }}
          >
            $0
          </Typography>
          <Typography
            style={{
              width: "100%",
              fontFamily: "Rubik",
              fontWeight: 400,
              fontSize: 14,
              lineHeight: "110%",
              textAlign: "center",
              color: "#64FF99",
              marginTop: "4px",
            }}
          >
            Revenue
          </Typography>
        </Box>
      </Box>
      <Box
        display={"flex"}
        flexDirection="column"
        justifyContent={"center"}
        alignItems={"center"}
        mt={5}
      >
        <Button
          style={{
            width: "80%",
            fontFamily: "Rubik",
            fontWeight: 500,
            fontSize: 16,
            lineHeight: "110%",
            textAlign: "center",
            color: "#ffffff",
            backgroundColor: "green",
            height: 52,
            borderRadius: "22px",
          }}
        >
          <img
            src={
              "https://cdn3d.iconscout.com/3d/premium/thumb/wallet-6541481-5407859.png?f=webp"
            }
            style={{
              width: 30,
              height: 30,
              objectFit: "contain",
              marginRight: 10,
            }}
          />{" "}
          wallet{" "}
          <span style={{ fontSize: 12, paddingLeft: 5 }}>(Coming soon)</span>
        </Button>
      </Box>
    </Box>
  );
};

export default Dashboard;
