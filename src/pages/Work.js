import React, { useEffect, useState } from "react";
import { Box, Grow, Typography } from "@mui/material";
import useTelegramSDK from "../hooks/useTelegramSDK";

import SingleProjectCard from "../components/SingleProjectCard";

import { PROJECTS_DATA } from "../utils/constants";

const Work = () => {
  const { viberate } = useTelegramSDK();

  return (
    <Box
      style={{
        width: "100%",
        height: "90vh",
        position: "relative",
        background: "#000000",
        paddingBottom: "100px",
        paddingLeft: "4%",
        paddingRight: "4%",
        paddingTop: "5%",
        zIndex: 0,
        overflowX: "hidden",
        overflowY: "hidden",
      }}
    >
      <Typography
        mb={1}
        style={{
          width: "100%",
          fontFamily: "Rubik",
          fontWeight: 600,
          fontSize: 20,
          lineHeight: "130%",
          textAlign: "left",
          color: "#ffffff",
        }}
      >
        Latest Projects
      </Typography>

      <Grow direction="down" in={true}>
        <Box
          style={{ height: "80vh", overflowY: "auto", paddingBottom: "100px" }}
        >
          {PROJECTS_DATA &&
            PROJECTS_DATA.map((ele, index) => (
              <Box onClick={() => viberate("medium")}>
                <SingleProjectCard key={index} projectData={ele} />
              </Box>
            ))}
        </Box>
      </Grow>
    </Box>
  );
};

export default Work;
