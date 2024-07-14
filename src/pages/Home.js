import * as React from "react";
import { useEffect, useState } from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { KeyboardArrowRight } from "@mui/icons-material";
import ProgressBar from "../components/ProgressBar";
import useGameHook from "../hooks/useGameHook";
import { LEAGUE_LEVEL_DATA, TAP_DATA } from "../utils/constants";
import useTelegramSDK from "../hooks/useTelegramSDK";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import WebApp from "@twa-dev/sdk";
import { updateScore, updateTapScore } from "../reducers/UiReducers";
import Profile from "../components/Profile";

const Home = () => {
  const dispatch = useDispatch();
  const { gamePercentageLeft, updateOnTapAction } = useGameHook();
  const { viberate, telegramUsername } = useTelegramSDK();
  const score = useSelector((state) => state.ui.score);
  const tapScore = useSelector((state) => state.ui.tapScore);
  const multiTapFlag = useSelector((state) => state.ui.multiTapFlag);

  const energyLeft = useSelector((state) => state.ui.energyLeft);
  const leagueLevel = useSelector((state) => state.ui.leagueLevel);
  const playLevels = useSelector((state) => state.ui.playLevels);
  const playValues = useSelector((state) => state.ui.playValues);
  const screenLoaded = useSelector((state) => state.ui.screenLoaded);

  const [clicks, setClicks] = useState([]);

  const handleTouch = (e) => {
    let tapPoints = multiTapFlag ? playValues.tap * 5 : playValues.tap;
    if (energyLeft > tapPoints) {
      viberate("medium");

      for (let i = 0; i < e.touches.length; i++) {
        const touch = e.touches[i];
        const rect = e.currentTarget.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;

        const clickDiv = document.createElement("div");
        clickDiv.textContent = `+${tapPoints}`;
        clickDiv.style.position = "absolute";
        clickDiv.style.top = `${y - 20}px`;
        clickDiv.style.left = `${x - 15}px`;
        clickDiv.style.animation = "float 1s ease-out";
        clickDiv.style.color = "white";
        clickDiv.style.fontWeight = "500";
        clickDiv.style.fontSize = "28px";
        clickDiv.style.zIndex = "99";
        clickDiv.style.fontFamily = "Rubik";
        clickDiv.style.userSelect = "none";

        e.currentTarget.appendChild(clickDiv);

        clickDiv.addEventListener("animationend", () => {
          clickDiv.remove();
        });

        updateOnTapAction();
      }
    }
  };

  const handleAnimationEnd = (id) => {
    setClicks((prevClicks) => prevClicks.filter((click) => click.id !== id));
  };

  return (
    <Box style={{ paddingLeft: "1%", paddingRight: "1%", paddingTop: 25 }}>
      {screenLoaded && (
        <Box
          style={{
            width: "100%",
            minHeight: "calc(100vh - 100px)",
            position: "relative",
            zIndex: 0,
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "column",
            overflow: "hidden",
            backgroundSize: "cover",
            backgroundPosition: "center center",
          }}
        >
          <Profile />
          <Box
            display={"flex"}
            flexDirection="column"
            justifyContent={"center"}
            alignItems={"center"}
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
              {score.toLocaleString()}
            </Typography>
          </Box>
          <Box
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              height: "45vh",
              position: "relative",
            }}
            onTouchStart={handleTouch}
          >
            <img
              src="task-logo-transparent.png"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                position: "absolute",
                filter: "drop-shadow(0 0 0.75rem #bdbdbd)",

                zIndex: 1,
              }}
            />
          </Box>
          <Box
            style={{
              width: "90%",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src="/images/energy.png"
                style={{
                  width: 25,
                  height: 25,
                  objectFit: "contain",
                }}
              />

              <Typography
                style={{
                  width: "100%",
                  fontWeight: 600,
                  fontSize: 18,
                  color: "#ffffff",
                }}
              >
                {energyLeft}/{playValues.energy}
              </Typography>
            </Box>
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src="https://cdn3d.iconscout.com/3d/premium/thumb/business-startup-5825143-4874125.png"
                style={{
                  width: 25,
                  height: 25,
                  objectFit: "contain",
                }}
              />

              <Typography
                style={{
                  width: "100%",
                  fontWeight: 600,
                  fontSize: 18,
                  color: "#ffffff",
                }}
              >
                Boost
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
      {!screenLoaded && (
        <Box
          display="flex"
          justifyContent={"center"}
          alignItems={"center"}
          style={{ height: "100vh" }}
        >
          <object type="image/svg+xml" data="images/app-loader.svg" />
        </Box>
      )}
    </Box>
  );
};

export default Home;
