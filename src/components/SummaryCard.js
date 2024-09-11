import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { useMemo } from "react";

import makeStyles from "@mui/styles/makeStyles";
import SmallProgressBar from "./SmallProgressBar";
import { useSelector } from "react-redux";
import TimerComp from "./TimerComp";

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

const SummaryCard = () => {
  const theme = useTheme();
  const classes = useStyles();

  const sm = useMediaQuery(theme.breakpoints.down("sm"));

  const summaryData = useSelector((state) => state.ui.summaryData);
  const timerValue = useSelector((state) => state.ui.timerValue);

  let progressPercent = useMemo(() => {
    if (summaryData) {
      return parseInt((100 * summaryData.correct) / summaryData.attempted);
    } else {
      return 60;
    }
  }, [summaryData]);

  let randomPerformace = useMemo(() => {
    if (progressPercent === 0) {
      return Math.floor(Math.random() * (50 - 20 + 1) + 20);
    } else if (progressPercent > 0 && progressPercent < 40) {
      return Math.floor(Math.random() * (80 - 50 + 1) + 50);
    } else {
      return Math.floor(Math.random() * (100 - 80 + 1) + 80);
    }
  }, [progressPercent]);

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          borderRadius: "12px",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "10px 15px",
          background:
            "linear-gradient(241.27deg, rgba(253, 255, 245, 0.12) -5.59%, rgba(253, 255, 245, 0) 100%)",
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
          <img
            src={"images/report.webp"}
            alt="TaskDao"
            width={120}
            height={120}
          />
          <Typography
            pb={1}
            style={{
              width: "100%",
              fontFamily: "Rubik",
              fontWeight: 600,
              fontSize: 20,
              lineHeight: "130%",
              textAlign: "center",
              color: "#FAFF00",
            }}
          >
            Your growth summary
          </Typography>
          <Typography
            pb={1}
            style={{
              width: "90%",
              textAlign: "center",
              fontSize: 14,
              lineHeight: "130%",
              color: "rgba(253, 255, 245, 0.8)",
              position: "relative",
              zIndex: 1,
              textAlign: "center",
            }}
          >
            You are doing better than <strong>{randomPerformace}%</strong> users
            with <strong>{progressPercent}%</strong> correct rate.
          </Typography>
          <Box
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <Box
              mt={1}
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-center",
                alignItems: "center",
                backgroundColor: "#212121",
                borderRadius: 7,
                paddingRight: 8,
                paddingLeft: 8,
                paddingTop: 4,
                paddingBottom: 4,
              }}
            >
              <img
                src={"images/correct.webp"}
                alt="TaskDao"
                width={22}
                height={22}
              />
              <Box
                style={{
                  width: "100%",
                  fontFamily: "Rubik",
                  fontWeight: 400,
                  fontSize: 12,
                  lineHeight: "100%",
                  textAlign: "center",
                  color: "#e5e5e5",
                }}
              >
                12 correct
              </Box>
            </Box>
            <Box
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-center",
                alignItems: "center",
                backgroundColor: "#212121",
                borderRadius: 7,
                paddingRight: 8,
                paddingLeft: 8,
                paddingTop: 4,
                paddingBottom: 4,
              }}
            >
              <img
                src={"images/wrong.webp"}
                alt="TaskDao"
                width={20}
                height={20}
              />
              <Box
                style={{
                  width: "100%",
                  fontFamily: "Rubik",
                  fontWeight: 400,
                  fontSize: 12,
                  lineHeight: "100%",
                  textAlign: "center",
                  color: "#e5e5e5",
                }}
              >
                2 incorrect
              </Box>
            </Box>
          </Box>

          <Typography
            pt={3}
            pb={1}
            style={{
              width: "100%",
              fontFamily: "'Rubik'",
              fontWeight: 400,
              fontSize: 12,
              lineHeight: "110%",
              textAlign: "center",
              color: "#e5e5e5",
            }}
          >
            Refer more friends via friends section and earn diamonds to share
            airdrop.
          </Typography>
        </Box>
        <Box>
          <Typography
            style={{
              textAlign: "center",
              color: "#e5e5e5",
            }}
          >
            Quiz will start in:
          </Typography>
          <TimerComp endTime={timerValue} />
        </Box>
      </Box>
    </>
  );
};

export default SummaryCard;
