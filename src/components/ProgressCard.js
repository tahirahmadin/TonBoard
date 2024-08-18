import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import React from "react";

import makeStyles from "@mui/styles/makeStyles";
import SmallProgressBar from "./SmallProgressBar";

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

const ProgressCard = ({
  correctPercent,
  category,
  img,
  attemptedQuestions,
  maxQuestions,
}) => {
  const theme = useTheme();
  const classes = useStyles();

  const sm = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Box
        sx={{
          width: 110,
          maxHeight: 300,
          borderRadius: "12px",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: sm ? "10px 15px" : "20px 20px",
          gap: "10px",
          backgroundColor: "rgba(253, 255, 245, 0.08)",
          // background:
          //   "linear-gradient(241.27deg, rgba(253, 255, 245, 0.08) -5.59%, rgba(253, 255, 245, 0) 100%)",
        }}
      >
        <Box
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            paddingTop: 10,
            paddingBottom: 10,
          }}
        >
          <Typography
            pb={1}
            style={{
              width: "100%",
              fontFamily: "'Rubik'",
              fontWeight: 400,
              fontSize: 8.5,
              lineHeight: "100%",
              textAlign: "center",
              color: "#eeeeee",
              marginBottom: 3,
            }}
          >
            {correctPercent}% were correct
          </Typography>
          <img src={img} alt="TaskDao" width={36} height={36} />

          <Typography
            pt={1}
            style={{
              width: "90%",
              fontFamily: "Rubik",
              fontWeight: 500,
              fontSize: 14,
              lineHeight: "110%",
              textAlign: "center",
              color: "#FAFF00",
            }}
          >
            {category}
          </Typography>
          <Typography
            pt={1}
            style={{
              width: "100%",
              fontFamily: "'Rubik'",
              fontWeight: 500,
              fontSize: 10,
              lineHeight: "110%",
              textAlign: "center",
              color: "#e5e5e5",
              marginBottom: 3,
            }}
          >
            {attemptedQuestions}/{maxQuestions}
          </Typography>
          <SmallProgressBar value={(attemptedQuestions * 100) / maxQuestions} />
        </Box>
      </Box>
    </>
  );
};

export default ProgressCard;
