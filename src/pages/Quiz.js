import * as React from "react";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Typography,
  useTheme,
} from "@mui/material";
import { KeyboardArrowRight } from "@mui/icons-material";
import ProgressBar from "../components/ProgressBar";
import useGameHook from "../hooks/useGameHook";
import { LEAGUE_LEVEL_DATA, TAP_DATA } from "../utils/constants";
import useTelegramSDK from "../hooks/useTelegramSDK";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import WebApp from "@twa-dev/sdk";
import { updateScore, updateTapScore } from "../reducers/UiReducers";
import OptionCard from "../components/OptionCard";
import Profile from "../components/Profile";
import makeStyles from "@mui/styles/makeStyles";
import SmallProgressBar from "../components/SmallProgressBar";
import ScoreComp from "../components/Score";

const useStyles = makeStyles((theme) => ({
  description: {
    width: "100%",
    textAlign: "center",
    fontSize: 16,
    lineHeight: "120%",
    color: "rgba(253, 255, 245, 0.8)",
    position: "relative",
    zIndex: 1,
  },
}));
const QuizPage = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const theme = useTheme();
  const { gamePercentageLeft, updateOnTapAction } = useGameHook();
  const { viberate, telegramUsername } = useTelegramSDK();
  const score = useSelector((state) => state.ui.score);
  const tapScore = useSelector((state) => state.ui.tapScore);
  const multiTapFlag = useSelector((state) => state.ui.multiTapFlag);

  const energyLeft = useSelector((state) => state.ui.energyLeft);

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
    <Box mt={1}>
      <Profile />
      <ScoreComp />

      {/* Question */}
      <Box
        mt={6}
        style={{
          width: "100%",
          position: "relative",
          zIndex: 0,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          overflow: "hidden",
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      >
        <Box
          style={{
            width: "90%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <Typography
            style={{
              fontFamily: "Rubik",
              fontWeight: 600,
              fontSize: 22,
              lineHeight: "120%",
              textAlign: "center",
              color: "#ffffff",
            }}
          >
            What is the most suitable category for IO.net Token?
          </Typography>
        </Box>
        <Box
          style={{
            width: "90%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            marginTop: 20,
          }}
        >
          <OptionCard
            title="GPU/DEPIN"
            img="https://cdn3d.iconscout.com/3d/premium/thumb/capital-a-letter-effect-text-9423674-7664624.png"
            sub_heading1="200M $TASK"
            description="32,430"
            color1="#4886FF"
            color2="#03429F"
            tick={true}
          />
          <OptionCard
            title="ORACLE"
            img="https://cdn3d.iconscout.com/3d/premium/thumb/capital-b-letter-effect-text-9423689-7664639.png"
            sub_heading1="200M $TASK"
            description="1,203"
            color1="#4886FF"
            color2="#03429F"
            tick={false}
          />
        </Box>
        <Typography
          mt={3}
          style={{
            width: "100%",
            fontWeight: 600,
            fontSize: 16,
            color: "#64FF99",
            textAlign: "center",
          }}
        >
          Great! Right answer
        </Typography>
        <Box pt={3}>
          <Typography
            className={classes.description}
            style={{
              textAlign: "center",
            }}
          >
            Next question in
          </Typography>
          <Typography
            style={{
              width: "100%",
              fontFamily: "Rubik",
              fontWeight: 700,
              fontSize: 21,
              lineHeight: "110%",
              textAlign: "center",
              color: "#ffffff",
            }}
          >
            01:41:23
          </Typography>
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
                width: 22,
                height: 22,
                objectFit: "contain",
              }}
            />

            <Typography
              style={{
                width: "100%",
                fontWeight: 600,
                fontSize: 16,
                color: "#ffffff",
              }}
            >
              9/10
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
                width: 22,
                height: 22,
                objectFit: "contain",
              }}
            />

            <Typography
              style={{
                width: "100%",
                fontWeight: 600,
                fontSize: 16,
                color: "#ffffff",
              }}
            >
              Boost
            </Typography>
          </Box>
        </Box>
      </Box>

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

export default QuizPage;
