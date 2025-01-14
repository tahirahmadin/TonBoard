import {
  Box,
  Button,
  Grow,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";

import makeStyles from "@mui/styles/makeStyles";

import { useServerAuth } from "../hooks/useServerAuth";
import { updateWorkCompleteStatus } from "../reducers/UiReducers";
import { useDispatch, useSelector } from "react-redux";
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

const SingleProjectCard = ({ projectData }) => {
  const classes = useStyles();
  const theme = useTheme();
  const { accountSC } = useServerAuth();
  const dispatch = useDispatch();

  const sm = useMediaQuery(theme.breakpoints.down("sm"));

  const workCompleted = useSelector((state) => state.ui.workCompleted);

  const isCompleted = useMemo(() => {
    if (workCompleted && workCompleted.length > 0) {
      let currentIndex = workCompleted.findIndex(
        (ele) => ele === projectData.id
      );
      if (currentIndex < 0) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }, [workCompleted]);

  const handleJoinAirdrop = async () => {
    let dataObj = {
      workId: projectData.id,
      userId: accountSC,
    };
    await dispatch(updateWorkCompleteStatus(dataObj));
  };

  return (
    <>
      <Grow direction="down" in={true}>
        <Box
          mt={1}
          sx={{
            border: "1px solid #212121",
            width: "100%",
            borderRadius: "22px",
            position: "relative",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            padding: "2px",
            background:
              "linear-gradient(241.27deg, rgba(253, 255, 245, 0.12) -5.59%, rgba(253, 255, 245, 0) 100%)",
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
              src={projectData.logo}
              alt="Project Logo"
              width={84}
              height={84}
              style={{ borderRadius: "50%" }}
            />
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
                {projectData.projectName}
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
                {projectData.description}
              </Typography>

              <a href={projectData.refLink} style={{ textDecoration: "none" }}>
                <Button
                  onClick={handleJoinAirdrop}
                  style={{
                    textTransform: "none",
                    paddingLeft: 10,
                    paddingRight: 10,
                    borderRadius: "8px",
                    background: isCompleted ? "transparent" : "#FAFF00",
                    fontFamily: "Rubik",
                    fontWeight: 400,
                    fontSize: 12,
                    lineHeight: "100%",
                    color: isCompleted ? "#ffffff" : "#000000",
                    border: "1px solid #414141",
                  }}
                >
                  {!isCompleted ? "Join for" : "Claimed"}
                  <Box
                    pl={0.5}
                    display={"flex"}
                    flexDirection="row"
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <img
                      src={"images/navbar/invite.webp"}
                      alt="invite"
                      width={16}
                      height={16}
                    />
                    <Typography
                      style={{
                        width: "100%",
                        fontFamily: "Rubik",
                        fontWeight: 700,
                        fontSize: 12,
                        lineHeight: "100%",
                        textAlign: "center",
                        color: isCompleted ? "#ffffff" : "#000000",
                      }}
                    >
                      50
                    </Typography>
                  </Box>
                </Button>
              </a>

              <Box style={{ position: "absolute", right: 10, bottom: 20 }}>
                {isCompleted && (
                  <img
                    src="https://cdn3d.iconscout.com/3d/premium/thumb/successfully-done-5108472-4288033.png"
                    style={{
                      width: 28,
                      height: 28,
                      objectFit: "contain",
                    }}
                  />
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </Grow>
    </>
  );
};

export default SingleProjectCard;
