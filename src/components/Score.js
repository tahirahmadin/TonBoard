import { Box, Typography } from "@mui/material";
import React from "react";
import useTelegramSDK from "../hooks/useTelegramSDK";
import SmallProgressBar from "./SmallProgressBar";
import useGameHook from "../hooks/useGameHook";
import { useDispatch } from "react-redux";
import { updateScore } from "../reducers/UiReducers";

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
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          fontFamily: "Rubik",
          fontWeight: 500,
          fontSize: 14,
          lineHeight: "100%",
          textAlign: "center",
          color: "#64FF99",
        }}
      >
        Current Points
      </Typography>
      <Typography
        onClick={() => {
          dispatch(updateScore(gameScore + 100000));
        }}
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
        {gameScore.toLocaleString()}
      </Typography>
    </Box>
  );
};

export default ScoreComp;
