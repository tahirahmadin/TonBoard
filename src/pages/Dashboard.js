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

      {/* Profile card */}
      {/* <Box
        display={"flex"}
        flexDirection="row"
        justifyContent={"flex-start"}
        alignItems={"center"}
        style={{
          borderRadius: "22px",
          paddingTop: 10,
          paddingBottom: 10,
          paddingLeft: 10,
          paddingRight: 10,
        }}
      >
        <Box
          style={{
            width: 120,
            height: 90,
            background: "#161811",
            borderRadius: "22px",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              borderRadius: "22px",
              position: "relative",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
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
        <Box pl={2}>
          <Typography
            style={{
              width: "100%",
              fontFamily: "'Rubik'",
              fontWeight: 700,
              fontSize: 21,
              lineHeight: "110%",
              textAlign: "left",
              color: "#ffffff",
              marginTop: "10px",
            }}
          >
            Tahir Ahmad
          </Typography>

          <Typography
            className={classes.description}
            style={{
              textAlign: "left",
            }}
          >
            Manager
          </Typography>
        </Box>
      </Box> */}
      {/* <ProfileCard /> */}
      <Box
        display={"flex"}
        flexDirection="column"
        justifyContent={"center"}
        alignItems={"center"}
        mt={4}
      >
        <Typography
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            fontFamily: "Rubik",
            fontWeight: 800,
            fontSize: 14,
            lineHeight: "100%",
            textAlign: "center",
            color: "#64FF99",
          }}
        >
          Current Points
        </Typography>
        <Typography
          style={{
            width: "100%",
            fontFamily: "Rubik",
            fontWeight: 700,
            fontSize: 28,
            lineHeight: "110%",
            textAlign: "center",
            color: "#ffffff",
          }}
        >
          13,435,545
        </Typography>
      </Box>
      {/* <Box
        display={"flex"}
        flexDirection="row"
        justifyContent={"space-around"}
        alignItems={"center"}
        style={{
          borderRadius: "22px",
          paddingTop: 10,
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
              marginTop: "10px",
            }}
          >
            133
          </Typography>
          <Typography
            style={{
              width: "100%",
              fontFamily: "Rubik",
              fontWeight: 400,
              fontSize: 14,
              lineHeight: "110%",
              textAlign: "center",
              color: "#ffffff",
              marginTop: "10px",
            }}
          >
            Tasks completed
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
            10
          </Typography>
          <Typography
            style={{
              width: "100%",
              fontFamily: "Rubik",
              fontWeight: 400,
              fontSize: 14,
              lineHeight: "110%",
              textAlign: "center",
              color: "#ffffff",
              marginTop: "10px",
            }}
          >
            Revenue
          </Typography>
        </Box>
      </Box> */}
      <Box
        display={"flex"}
        flexDirection="column"
        justifyContent={"center"}
        alignItems={"center"}
        mt={4}
      >
        <Button
          style={{
            width: "80%",
            fontFamily: "Rubik",
            fontWeight: 400,
            fontSize: 16,
            lineHeight: "110%",
            textAlign: "center",
            color: "#ffffff",
            backgroundColor: "#26A4E4",
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
            }}
          />{" "}
          Connect your wallet
        </Button>
      </Box>
    </Box>
  );
};

export default Dashboard;
