import {
  Box,
  Button,
  Fade,
  Grow,
  Theme,
  Typography,
  Zoom,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import makeStyles from "@mui/styles/makeStyles";
import SmallProgressBar from "./SmallProgressBar";
import useGameHook from "../hooks/useGameHook";
import { getNumbersInFormatOnlyMillions } from "../actions/helperFn";

const useStyles = makeStyles((theme) => ({
  description: {
    width: "100%",
    textAlign: "left",
    fontSize: 16,
    lineHeight: "130%",
    color: "rgba(253, 255, 245, 0.8)",
    position: "relative",
    zIndex: 1,
    [theme.breakpoints.down("lg")]: {
      fontSize: 16,
    },
    [theme.breakpoints.down("md")]: {
      fontSize: 14,
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: 15,
    },
  },
}));

const QuizStatsCard = ({ pointsOnCorrect }) => {
  const theme = useTheme();
  const classes = useStyles();

  const sm = useMediaQuery(theme.breakpoints.down("sm"));

  const { pointsOnCorrectAnswer, pointsOnWrongAnswer, timerDuration } =
    useGameHook();

  return (
    <>
      <Box
        sx={{
          width: "90%",
          height: 40,
          borderRadius: "22px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          padding: "8px 8px",
          gap: "10px",
          background:
            "linear-gradient(241.27deg, rgba(253, 255, 245, 0.08) -5.59%, rgba(253, 255, 245, 0) 100%)",
        }}
      >
        <Box
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <img
            src={
              "https://cdn3d.iconscout.com/3d/premium/thumb/cash-bonus-on-online-shopping-11964562-9764218.png?f=webp"
            }
            alt="TaskDao"
            width={32}
            height={32}
          />

          <Box>
            <Typography
              style={{
                width: "100%",
                fontFamily: "Rubik",
                fontWeight: 600,
                fontSize: 12,
                lineHeight: "110%",
                textAlign: "left",
                color: "#ffffff",
              }}
            >
              {getNumbersInFormatOnlyMillions(pointsOnCorrectAnswer)}
            </Typography>
            <Typography
              style={{
                width: "100%",
                fontFamily: "Rubik",
                fontWeight: 400,
                fontSize: 8,
                lineHeight: "110%",
                textAlign: "left",
                color: "#e5e5e5",
              }}
            >
              Reward amount
            </Typography>
          </Box>
        </Box>
        <Box style={{ border: "1px solid #919191", height: 18 }}></Box>
        <Box
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <img
            src={
              "https://cdn3d.iconscout.com/3d/premium/thumb/stopwatch-6430267-5449295.png"
            }
            alt="TaskDao"
            width={32}
            height={32}
          />

          <Box>
            <Typography
              style={{
                width: "90%",
                fontFamily: "Rubik",
                fontWeight: 600,
                fontSize: 12,
                lineHeight: "110%",
                textAlign: "left",
                color: "#ffffff",
              }}
            >
              {parseFloat(timerDuration / 60)} Hrs
            </Typography>
            <Typography
              style={{
                width: "100%",
                fontFamily: "Rubik",
                fontWeight: 400,
                fontSize: 8,
                lineHeight: "110%",
                textAlign: "left",
                color: "#e5e5e5",
              }}
            >
              Slot Timer
            </Typography>
          </Box>
        </Box>
        <Box style={{ border: "1px solid #919191", height: 18 }}></Box>
        <Box
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <img
            src={
              "https://cdn3d.iconscout.com/3d/premium/thumb/flash-sale-11376940-9149533.png"
            }
            alt="TaskDao"
            width={24}
            height={24}
          />
          <Box>
            <Typography
              style={{
                width: "90%",
                fontFamily: "Rubik",
                fontWeight: 600,
                fontSize: 12,
                lineHeight: "110%",
                textAlign: "left",
                color: "#ffffff",
                paddingLeft: 5,
              }}
            >
              4
            </Typography>
            <Typography
              style={{
                width: "100%",
                fontFamily: "Rubik",
                fontWeight: 400,
                fontSize: 8,
                lineHeight: "110%",
                textAlign: "left",
                color: "#e5e5e5",
                paddingLeft: 5,
              }}
            >
              Daily Steak
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default QuizStatsCard;
