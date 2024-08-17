import { Box, Typography } from "@mui/material";
import React from "react";
import useTelegramSDK from "../hooks/useTelegramSDK";
import SmallProgressBar from "./SmallProgressBar";
import useGameHook from "../hooks/useGameHook";
import { useDispatch } from "react-redux";
import { updateScore } from "../reducers/UiReducers";
import {
  getNumbersInFormatOnlyMillions,
  numberWithCommas,
} from "../actions/helperFn";

const ScoreComp = () => {
  const dispatch = useDispatch();
  const { gameScore } = useGameHook();

  return (
    <Box
      display={"flex"}
      flexDirection="column"
      justifyContent={"center"}
      alignItems={"space-between"}
      mt={2}
    >
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
        {numberWithCommas(gameScore)}
      </Typography>
      <Typography
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          fontFamily: "Rubik",
          fontSize: 14,
          lineHeight: "130%",
          color: "rgba(253, 255, 245, 0.8)",
          lineHeight: "100%",
          textAlign: "center",
          color: "yellow",
        }}
      >
        Current Points
      </Typography>
    </Box>
  );
};

export default ScoreComp;
