import * as React from "react";
import { useEffect, useState, useMemo } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import useGameHook from "../hooks/useGameHook";
import useTelegramSDK from "../hooks/useTelegramSDK";

import { useDispatch, useSelector } from "react-redux";

import OptionCard from "../components/OptionCard";
import Profile from "../components/Profile";
import makeStyles from "@mui/styles/makeStyles";

import ScoreComp from "../components/Score";
import TimerComp from "../components/TimerComp";
import { QUIZ_DATA } from "../utils/constants";

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

  const currentSlotNo = useSelector((state) => state.ui.currentSlotNo);
  const currentQueNo = useSelector((state) => state.ui.currentQueNo);
  const ansSelected = useSelector((state) => state.ui.ansSelected);
  const screenLoaded = useSelector((state) => state.ui.screenLoaded);

  const questionData = useMemo(() => {
    return QUIZ_DATA[currentQueNo];
  }, [currentQueNo, currentSlotNo]);

  const quizMessageStatus = React.useMemo(() => {
    return ansSelected[currentQueNo] === questionData.correct;
  }, [currentQueNo, ansSelected, questionData]);

  return (
    <Box>
      <Profile />
      <ScoreComp />

      {/* Question */}
      {screenLoaded && (
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
              {questionData.title}
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
              inputOption={1}
              title={questionData.option1}
              img="https://cdn3d.iconscout.com/3d/premium/thumb/capital-a-letter-effect-text-9423674-7664624.png"
              description="32,430"
              tick={quizMessageStatus && ansSelected[currentQueNo] === 1}
            />
            <OptionCard
              inputOption={2}
              title={questionData.option2}
              img="https://cdn3d.iconscout.com/3d/premium/thumb/capital-b-letter-effect-text-9423689-7664639.png"
              description="1,203"
              tick={!quizMessageStatus && ansSelected[currentQueNo] === 2}
            />
          </Box>
          <Typography
            mt={3}
            style={{
              width: "100%",
              fontWeight: 600,
              fontSize: 16,
              color: quizMessageStatus ? "#64FF99" : "red",
              textAlign: "center",
            }}
          >
            {quizMessageStatus && "Great! Right answer"}
            {!quizMessageStatus && "Sorry! Try next time!"}
          </Typography>
          <Box pt={3}>
            <Typography
              className={classes.description}
              style={{
                textAlign: "center",
              }}
            >
              Next slot in
            </Typography>
            <TimerComp endTime={Date.now() + 21600000} />
          </Box>
          <Box
            pt={4}
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
                {5 - currentQueNo}/5
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
      )}

      {!screenLoaded && (
        <Box
          display="flex"
          justifyContent={"center"}
          alignItems={"center"}
          style={{ height: "80vh" }}
        >
          <img
            type="image/svg+xml"
            src="https://cdn3d.iconscout.com/3d/premium/thumb/businesswoman-satisfied-after-investment-growth-6219694-5106203.png"
          />
        </Box>
      )}
    </Box>
  );
};

export default QuizPage;
