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
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  description: {
    width: "100%",
    textAlign: "center",
    fontSize: 14,
    lineHeight: "130%",
    color: "rgba(253, 255, 245, 0.8)",
    position: "relative",
    zIndex: 1,
  },
}));

const SingleProjectCard = ({
  projectId,
  title,
  description,
  category,
  img,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Link to={`/tasks/${projectId}`}>
        <Box
          mt={1}
          sx={{
            border: "1px solid #313131",
            width: "100%",
            borderRadius: "22px",
            position: "relative",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            padding: "2px",
            background:
              "linear-gradient(241.27deg, rgba(253, 255, 245, 0.08) -5.59%, rgba(253, 255, 245, 0.01) 100%)",
          }}
        >
          {/* Start Images */}
          <img
            src="star.png"
            alt="TaskDao"
            width={16}
            height={16}
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
            width={12}
            height={12}
            style={{
              position: "absolute",
              left: "10%",
              top: "10%",
              bottom: "",
              zIndex: 1,
            }}
          />

          <Box width={"30%"} p={1}>
            <img
              src={img}
              alt="Project Logo"
              width={84}
              height={84}
              style={{ borderRadius: "50%" }}
            />
            {/* <Typography
              style={{
                width: "130.03px",
                minHeight: "33.53px",
                borderRadius: "10px",
                transform: "rotate(0deg)",
                background: color2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                fontFamily: "'Rubik'",
                fontWeight: 800,
                fontSize: 12,
                lineHeight: "100%",
                textAlign: "center",
                color: "#64FF99",
                margin: "7px 0",
                zIndex: 2,
              }}
            >
              {sub_heading1}
              <br />
              <span style={{ color: "#fff" }}>{sub_heading2}</span>
            </Typography> */}
          </Box>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              borderRadius: "22px",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "20px 20px",
              gap: "10px",
            }}
          >
            <Box
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "center",
                gap: "7px",
              }}
            >
              <Typography
                style={{
                  width: "100%",
                  fontFamily: "Rubik",
                  fontWeight: 700,
                  fontSize: 16,
                  lineHeight: "110%",
                  textAlign: "left",
                  color: "#ffffff",
                }}
              >
                {title}
              </Typography>

              <Typography
                style={{
                  width: "100%",
                  fontSize: 14,
                  lineHeight: "130%",
                  color: "rgba(253, 255, 245, 0.8)",
                  position: "relative",
                  zIndex: 1,
                  textAlign: "left",
                  minHeight: 28,
                }}
              >
                {description}
              </Typography>

              <Typography
                style={{
                  width: "fit-content",
                  paddingLeft: 10,
                  paddingRight: 10,
                  minHeight: "20px",
                  borderRadius: "10px",
                  background: "#FFE500",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                  fontFamily: "Rubik",
                  fontWeight: 400,
                  fontSize: 12,
                  lineHeight: "100%",
                  textAlign: "left",
                  color: "#000000",
                }}
              >
                {category}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Link>
    </>
  );
};

export default SingleProjectCard;
