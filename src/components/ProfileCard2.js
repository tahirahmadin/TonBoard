import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import React from "react";

import makeStyles from "@mui/styles/makeStyles";

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

const ProfileCard2 = ({}) => {
  const classes = useStyles();
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Box
        sx={{
          width: "100%",
          borderRadius: "22px",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
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
              padding: "20px 20px",
              gap: "10px",
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
                minWidth: 70,
                minHeight: 70,
                zIndex: 1,
                borderRadius: 10,
              }}
            />
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
                top: "30%",
                bottom: "",
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
                    fontSize: 16,
                    lineHeight: "110%",
                    textAlign: "center",
                    color: "#FAFF00",
                    marginTop: "10px",
                  }}
                >
                  Tahir Ahmad
                </Typography>
                <Typography
                  style={{
                    width: "130.03px",
                    minHeight: "33.53px",
                    borderRadius: "10px",
                    transform: "rotate(-4deg)",
                    background: "#03429F",
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
                  tahirahmadin
                  <br />
                  <span style={{ color: "#fff" }}>Working</span>
                </Typography>
              </Box>
              <Typography
                className={classes.description}
                style={{
                  textAlign: "center",
                  minHeight: 50,
                }}
              >
                tahirahmadin
              </Typography>
              <Box
                style={{
                  width: "100%",
                  height: "30px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                }}
              >
                <img
                  src="https://png.pngtree.com/png-clipart/20220612/original/pngtree-dollar-coin-icon-3d-png-image_7966148.png"
                  style={{
                    width: 18,
                    height: 18,
                  }}
                />
                <Typography
                  variant="body2"
                  style={{
                    textAlign: "center",
                  }}
                >
                  +5,000
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ProfileCard2;
