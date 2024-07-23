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
import useGameHook from "../hooks/useGameHook";

const useStyles = makeStyles((theme) => ({
  description: {
    width: "100%",
    textAlign: "center",
    fontSize: 12,
    lineHeight: "120%",
    color: "rgba(253, 255, 245, 0.8)",
    position: "relative",
    zIndex: 1,
  },
}));

const OptionCard = ({
  img,
  title,
  description,
  tick,
  onClick,
  inputOption,
  isSelected,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));

  const { handleAnswerSelected } = useGameHook();

  const handleSelect = async () => {
    handleAnswerSelected(inputOption);
  };

  return (
    <>
      <Box
        onClick={handleSelect}
        sx={{
          width: "100%",
          maxWidth: 150,
          minWidth: 100,
          height: 185,
          borderRadius: "22px",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "2px",
          inset: "0",

          background: tick
            ? `linear-gradient(180deg, #4886FF 0%, green 100%)`
            : "transparent",
        }}
      >
        <Box
          style={{
            width: "100%",
            height: "100%",
            background: "#161811",
            borderRadius: "22px",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              borderRadius: "22px",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "5px 5px",
              gap: "5px",
              background:
                "linear-gradient(241.27deg, rgba(253, 255, 245, 0.08) -5.59%, rgba(253, 255, 245, 0) 100%)",
            }}
          >
            <img
              src="star.png"
              alt="TaskDao"
              width={20}
              height={20}
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
              width={16}
              height={16}
              style={{
                position: "absolute",
                left: "10%",
                top: "25%",
                bottom: "",
                zIndex: 1,
              }}
            />
            <img src={img} alt="TaskDao" width={50} height={50} style={{}} />
            <Box
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: "5px",
              }}
            >
              <Box
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <Typography
                  style={{
                    width: "90%",
                    fontFamily: "'Rubik'",
                    fontWeight: 700,
                    fontSize: 16,
                    lineHeight: "110%",
                    textAlign: "center",
                    color: "#FAFF00",
                    marginTop: "10px",
                    minHeight: 36,
                  }}
                >
                  {title}
                </Typography>
              </Box>
              <Typography
                className={classes.description}
                style={{
                  textAlign: "center",
                  fontSize: 14,
                  minHeight: 20,
                }}
              >
                {description}+
              </Typography>
              {tick && (
                <img
                  src="https://cdn3d.iconscout.com/3d/premium/thumb/successfully-done-5108472-4288033.png"
                  style={{
                    width: 42,
                    height: 42,
                    objectFit: "contain",
                  }}
                />
              )}

              {!tick && (
                <img
                  src="https://cdn3d.iconscout.com/3d/premium/thumb/wrong-9090242-7480311.png?f=webp"
                  style={{
                    width: 42,
                    height: 42,
                    objectFit: "contain",
                  }}
                />
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default OptionCard;
