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
import { useSelector } from "react-redux";

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

const TaskRewardComp = () => {
  const theme = useTheme();
  const classes = useStyles();

  const sm = useMediaQuery(theme.breakpoints.down("sm"));

  const { pointsOnCorrectAnswer, pointsOnWrongAnswer, timerDuration } =
    useGameHook();

  const currentSlotNo = useSelector((state) => state.ui.currentSlotNo);

  return (
    <>
      <Box
        sx={{
          paddingLeft: 30,
          paddingRight: 30,
          height: 40,
          borderRadius: "22px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
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
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            paddingLeft: 20,
            paddingRight: 20,
          }}
        >
          <img
            src={
              "https://cdn3d.iconscout.com/3d/premium/thumb/gift-3102354-2582668@0.png"
            }
            alt="TaskDao"
            width={32}
            height={32}
          />

          <Box>
            <Typography
              style={{
                fontFamily: "Rubik",
                fontWeight: 400,
                fontSize: 13,
                lineHeight: "110%",
                textAlign: "left",
                color: "#ffffff",
              }}
            >
              Pool Reward of <strong>200 TON</strong>
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default TaskRewardComp;
