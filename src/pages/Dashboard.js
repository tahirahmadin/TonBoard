import React, { useEffect, useState } from "react";

import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { getDashboardData } from "../actions/serverActions";
import makeStyles from "@mui/styles/makeStyles";
import ProgressCard from "../components/ProgressCard";
import { Link } from "react-router-dom";
import { useServerAuth } from "../hooks/useServerAuth";
import {
  TonConnectButton,
  useTonAddress,
  useTonWallet,
} from "@tonconnect/ui-react";
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

  const username = useSelector((state) => state.ui.username);

  const [dashboardData, setDashboardData] = useState([]);
  const { accountSC } = useServerAuth();
  const userFriendlyAddress = useTonAddress();
  const wallet = useTonWallet();

  const userAddress = useSelector((state) => state.ui.userAddress);
  const screenLoaded = useSelector((state) => state.ui.screenLoaded);

  // // API call: to fetch tasks
  useEffect(() => {
    if (!accountSC) return;

    async function asyncFn() {
      let res = await getDashboardData(accountSC);

      console.log("progress data ", res);
      if (res) {
        setDashboardData(res);
      }
    }
    asyncFn();
  }, [accountSC]);

  useEffect(() => {
    async function asyncFn() {
      if (
        screenLoaded &&
        userFriendlyAddress &&
        userAddress != userFriendlyAddress.toLowerCase() &&
        accountSC
      ) {
        // await updateUserWalletAddressAPI(
        //   userFriendlyAddress,
        //   wallet.name,
        //   accountSC
        // );
        // dispatch(updateUserWalletAddress(userFriendlyAddress));
      }
    }

    asyncFn();
  }, [screenLoaded, accountSC, userFriendlyAddress, userAddress, wallet?.name]);

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
          height: 50,
          backgroundImage:
            "url(https://img.freepik.com/free-vector/gradient-dynamic-blue-lines-background_23-2148995756.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
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
      <Box pt={4}>
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
          {username}
        </Typography>
      </Box>

      <Box
        style={{ height: "12vh" }}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"flex-start"}
      >
        <ScoreComp />
      </Box>

      <Box
        style={{
          width: "90%",
          height: "100%",
          maxHeight: 70,
          background: "transparent",
          borderRadius: "24px",
          marginTop: "10px",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "10px",
          // padding: "15px",
          marginLeft: "5%",
        }}
      >
        <Box
          style={{
            width: "100%",
            minHeight: 70,
            background:
              "linear-gradient(241.27deg, rgba(253, 255, 245, 0.08) -5.59%, rgba(253, 255, 245, 0) 100%)",
            borderRadius: "12px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 15px",
          }}
        >
          <Typography
            style={{
              fontFamily: "Rubik",
              fontWeight: 400,
              fontSize: "12px",
              lineHeight: "14px",
              color: "#FFFFFF",
            }}
          >
            {userFriendlyAddress
              ? "Your TON wallet"
              : "Wallet address not found"}
          </Typography>
          <TonConnectButton />
        </Box>
      </Box>

      <Box
        style={{ width: "100%" }}
        display={"flex"}
        justifyContent={"center"}
        mt={2}
      >
        <Box style={{ width: "90%" }}>
          <Typography
            mb={1}
            style={{
              width: "100%",
              fontFamily: "Rubik",
              fontWeight: 700,
              fontSize: 16,
              lineHeight: "110%",
              textAlign: "left",
              color: "#ffffff",
            }}
          >
            Your progress
          </Typography>

          <Box style={{ overflowX: "scroll" }}>
            <Grid container spacing={1} mt={1}>
              {dashboardData &&
                dashboardData?.slice(0, 3).map((el) => (
                  <Grid item xs={4} md={4}>
                    <ProgressCard
                      key={el?.category}
                      correctPercent={70}
                      category={el?.category}
                      img="https://cdn3d.iconscout.com/3d/free/thumb/free-bitcoin-3443546-2879622.png?f=webp"
                      attemptedQuestions={el?.completed}
                      maxQuestions={el?.total}
                    />
                  </Grid>
                ))}
            </Grid>
          </Box>
        </Box>
      </Box>
      {/* <Box
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
      </Box> */}
    </Box>
  );
};

export default Dashboard;
