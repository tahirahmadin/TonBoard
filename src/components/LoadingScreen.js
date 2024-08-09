import React, { useEffect, useRef, useState } from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { KeyboardArrowRight } from "@mui/icons-material";
import ProgressBar from "../components/ProgressBar";
import useGameHook from "../hooks/useGameHook";
import { LEAGUE_LEVEL_DATA, TAP_DATA } from "../utils/constants";
import useTelegramSDK from "../hooks/useTelegramSDK";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateScore, updateTapScore } from "../reducers/UiReducers";
import SuccessSnackbar from "../components/SuccessSnackbar";
import { getNumbersInFormat, numberWithCommas } from "../actions/helperFn";

const LoadingScreen = ({ text }) => {
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down(390));

  return (
    <Box
      style={{
        width: "100%",
        height: "100vh",
        position: "relative",
        // background: "linear-gradient(180deg, #000000 0%, #03429F 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        backgroundColor: "#000000",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        paddingBottom: "25%",
      }}
    >
      <Box
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "7px",
          position: "relative",
        }}
      >
        <Box
          style={{
            width: "90%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src="https://static.vecteezy.com/system/resources/previews/009/428/317/non_2x/3d-social-media-icons-telegram-free-png.png"
            style={{
              width: "100%",
              height: 200,
              objectFit: "contain",
            }}
          />
        </Box>
        <Typography
          style={{
            fontFamily: "Rubik",
            fontWeight: 900,
            fontSize: 32,
            lineHeight: "100%",
            textAlign: "center",
            color: "#0088cc",
          }}
        >
          TonBoard
        </Typography>
        <Typography
          style={{
            marginTop: 5,
            fontFamily: "Rubik",
            fontWeight: 600,
            fontSize: 22,
            lineHeight: "100%",
            textAlign: "center",
            color: "#ffffff",
          }}
        >
          {text}
        </Typography>
      </Box>
      <Typography
        style={{
          position: "absolute",
          bottom: 40,
          fontFamily: "Rubik",
          fontWeight: 400,
          fontSize: 14,
          lineHeight: "100%",
          textAlign: "center",
          color: "#ffffff",
        }}
      >
        Proudly powered by TON Foundation ❤️
      </Typography>
    </Box>
  );
};

export default LoadingScreen;
