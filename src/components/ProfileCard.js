import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import React from "react";

import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  description: {
    width: "100%",
    textAlign: "center",
    fontSize: 16,
    lineHeight: "130%",
    color: "rgba(253, 255, 245, 0.8)",
    position: "relative",
    zIndex: 1,
  },
}));

const ProfileCard = ({}) => {
  const classes = useStyles();
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Box
        style={{
          width: 120,
          height: 90,
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
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            background:
              "linear-gradient(241.27deg, rgba(253, 255, 245, 0.08) -5.59%, rgba(253, 255, 245, 0) 100%)",
          }}
        >
          <img
            src={
              "https://cdn3d.iconscout.com/3d/premium/thumb/manager-10946991-8770014.png"
            }
            alt="TaskDao"
            width={70}
            height={70}
            style={{
              minWidth: 50,
              minHeight: 50,
              zIndex: 1,
            }}
          />
        </Box>
      </Box>
      <Box>
        <Typography
          style={{
            width: "100%",
            fontFamily: "'Rubik'",
            fontWeight: 700,
            fontSize: 21,
            lineHeight: "110%",
            textAlign: "left",
            color: "#ffffff",
            marginTop: "10px",
          }}
        >
          Tahir Ahmad
        </Typography>

        <Typography
          className={classes.description}
          style={{
            textAlign: "left",
          }}
        >
          tahirahmadin
        </Typography>
        <Typography
          style={{
            width: "130.03px",
            minHeight: "43.53px",
            borderRadius: "10px",
            background: "#03429F",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            fontFamily: "Rubik",
            fontWeight: 800,
            fontSize: 14,
            lineHeight: "100%",
            textAlign: "center",
            color: "#64FF99",
            margin: "7px 0",
          }}
        >
          Total Points
          <br />
          <span style={{ color: "#fff" }}>232,444</span>
        </Typography>
      </Box>
    </Box>
  );
};

export default ProfileCard;
