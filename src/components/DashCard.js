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

const Card = ({
  rank,
  img,
  title,
  sub_heading1,
  sub_heading2,
  description,
  color1,
  color2,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 350,
        maxHeight: 420,
        borderRadius: "45px",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "4px",
        boxShadow: `0 5px 30px 1px ${color1}`,
        inset: "0",

        background: `linear-gradient(180deg, ${color1} 0%, ${color2} 100%)`,
      }}
    >
      <Box
        style={{
          width: "100%",
          height: "100%",
          background: "#161811",
          borderRadius: "45px",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            borderRadius: "45px",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",

            padding: sm ? "10px 15px" : "20px 20px",
            gap: "10px",
            background:
              "linear-gradient(241.27deg, rgba(253, 255, 245, 0.08) -5.59%, rgba(253, 255, 245, 0) 100%)",
          }}
        >
          <Box
            style={{
              width: 58,
              height: 58,
              position: "absolute",
              top: -26,
              left: -10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1,
            }}
          >
            <svg
              width="58"
              height="58"
              viewBox="0 0 114 114"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }}
            >
              <path
                d="M62.5411 6.27219C68.6623 -3.89164 84.3157 1.29427 83.1576 13.1024C82.4071 20.7552 89.4565 26.8465 96.9195 24.9939C108.435 22.1353 115.836 36.8709 106.668 44.4016C100.726 49.2822 101.403 58.5741 107.99 62.5413C118.154 68.6624 112.968 84.3158 101.16 83.1577C93.5075 82.4072 87.4162 89.4566 89.2688 96.9196C92.1274 108.435 77.3918 115.836 69.8611 106.668C64.9804 100.726 55.6886 101.403 51.7214 107.991C45.6003 118.154 29.9469 112.969 31.105 101.16C31.8555 93.5076 24.8061 87.4163 17.3431 89.2689C5.82781 92.1275 -1.57379 77.3919 7.59467 69.8612C13.5368 64.9805 12.8593 55.6887 6.27209 51.7215C-3.89175 45.6004 1.29416 29.947 13.1023 31.1051C20.7551 31.8556 26.8464 24.8062 24.9937 17.3432C22.1352 5.82792 36.8707 -1.57368 44.4015 7.59478C49.2821 13.5369 58.574 12.8594 62.5411 6.27219Z"
                fill={color1}
              />
            </svg>
            <Typography
              style={{
                position: "relative",
                fontFamily: "'Rubik'",
                fontStyle: "normal",
                fontWeight: 700,
                fontSize: 28,
                color: "#FAFF00",
              }}
            >
              #{rank}
            </Typography>
          </Box>
          <img
            src="star.png"
            alt="TaskDao"
            width={40}
            height={40}
            style={{
              position: "absolute",
              right: sm ? "7%" : "10%",
              top: sm ? "10%" : "8%",
              zIndex: 1,
            }}
          />
          <img
            src="star.png"
            alt="TaskDao"
            width={sm ? 18 : 32}
            height={sm ? 18 : 32}
            style={{
              position: "absolute",
              left: sm ? 100 : "10%",
              top: !sm ? "30%" : "",
              bottom: sm ? 5 : "",
              zIndex: 1,
            }}
          />
          <img
            src={img}
            alt="TaskDao"
            width={sm ? 100 : 135}
            height={sm ? 100 : 135}
            style={{
              minWidth: sm ? 100 : 130,
              minHeight: sm ? 100 : 130,
              zIndex: 1,
            }}
          />
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
                  fontSize: 32,
                  lineHeight: "110%",
                  textAlign: "center",
                  color: "#FAFF00",
                  marginTop: "10px",
                }}
              >
                {title}
              </Typography>
              <Typography
                style={{
                  width: "260.03px",
                  minHeight: "66.53px",
                  borderRadius: "20px",
                  transform: "rotate(-4deg)",
                  background: color2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  fontFamily: "'Rubik'",
                  fontWeight: 800,
                  fontSize: 24,
                  lineHeight: "100%",
                  textAlign: "center",
                  color: "#64FF99",
                  margin: "15px 0",
                  zIndex: 2,
                }}
              >
                {sub_heading1}
                <br />
                <span style={{ color: "#fff" }}>{sub_heading2}</span>
              </Typography>
            </Box>
            <Typography
              className={classes.description}
              style={{
                textAlign: "center",
                minHeight: 127,
              }}
            >
              {description}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const FancyCard = () => {
  const theme = useTheme();

  return (
    <>
      <Card
        rank={2}
        title="SOCIAL POINTS"
        img="https://cdn3d.iconscout.com/3d/premium/thumb/manager-10946991-8770014.png"
        sub_heading1="200M $TASK"
        sub_heading2="Food Community"
        description="Complete tasks, create Food content using #TASK and sign up friends using your referral link"
        color1="#4886FF"
        color2="#03429F"
      />
    </>
  );
};

export default FancyCard;
