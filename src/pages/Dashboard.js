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
import TimeAgo from "react-timeago";
import { CATEGORY_DATA } from "../utils/constants";

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
  const createdDate = useSelector((state) => state.ui.createdDate);
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
      <Box
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={"images/navbar/dashboard.webp"}
          alt="dashboard"
          width={108}
          height={108}
          style={{ filter: "drop-shadow(0 -6mm 14mm #757575)" }}
        />
        <Typography
          mb={1}
          style={{
            width: "100%",
            fontFamily: "Rubik",
            fontWeight: 600,
            fontSize: 20,
            lineHeight: "110%",
            textAlign: "center",
            color: "#ffffff",
          }}
        >
          Dashboard
        </Typography>
        <Typography
          style={{
            width: "95%",
            textAlign: "center",
            fontSize: 15,
            lineHeight: "130%",
            color: "rgba(253, 255, 245, 0.8)",
            position: "relative",
            zIndex: 1,
            fontWeight: 400,
          }}
        >
          Track your progress and earn reward on TON
        </Typography>
      </Box>
      <Box
        mt={2}
        sx={{
          // border: "1px solid #313131",
          width: "100%",
          borderRadius: "22px",
          position: "relative",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          padding: "2px",
          background:
            "linear-gradient(241.27deg, rgba(253, 255, 245, 0.12) -5.59%, rgba(253, 255, 245, 0.01) 100%)",
        }}
      >
        {/* Start Images */}
        <img
          src="star.png"
          alt="TaskDao"
          width={16}
          height={16}
          style={{
            position: "absolute",
            right: "10%",
            top: "8%",
            zIndex: 1,
          }}
        />
        <img
          src="star.png"
          alt="TaskDao"
          width={12}
          height={12}
          style={{
            position: "absolute",
            left: "10%",
            top: "10%",
            bottom: "",
            zIndex: 1,
          }}
        />

        <Box width={"40%"} p={1}>
          <img
            src={
              "https://cdn3d.iconscout.com/3d/premium/thumb/businessman-doing-meditation-10087255-8179740.png"
            }
            alt="Project Logo"
            width={64}
            height={64}
          />
        </Box>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            borderRadius: "22px",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "20px 20px",
            gap: "10px",
          }}
        >
          <Box
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
              gap: "7px",
            }}
          >
            <ScoreComp />
            <Typography
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
              {username ? username : "Telegram user"}
            </Typography>

            <Typography
              style={{
                width: "100%",
                fontSize: 14,
                lineHeight: "130%",
                color: "rgba(253, 255, 245, 0.8)",
                position: "relative",
                zIndex: 1,
                textAlign: "left",
              }}
            >
              Onboarded: <TimeAgo date={createdDate} />
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        style={{
          width: "100%",
          height: "100%",
          maxHeight: 90,
          background: "transparent",
          borderRadius: "24px",
          marginTop: "10px",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <Box
          style={{
            width: "100%",
            minHeight: 80,

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
              paddingBottom: 7,
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
        <Box style={{ width: "100%" }}>
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

          <Box
            style={{
              overflowX: "scroll",
              display: "flex",
              justifyContent: "flex-start",
              gap: "10px",
            }}
          >
            {dashboardData &&
              dashboardData?.slice(0, 5).map((el) => (
                <Box>
                  <ProgressCard
                    key={el?.category}
                    correctPercent={70}
                    category={el?.category}
                    img={CATEGORY_DATA[el.category]}
                    attemptedQuestions={el?.completed}
                    maxQuestions={el?.total}
                  />
                </Box>
              ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
