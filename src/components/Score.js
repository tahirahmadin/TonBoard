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
    >
      <Box
        display={"flex"}
        flexDirection="row"
        justifyContent={"center"}
        alignItems={"center"}
      >
        <img src={"images/invite.webp"} alt="invite" width={32} height={32} />
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
      </Box>
    </Box>
  );
};

export default ScoreComp;
