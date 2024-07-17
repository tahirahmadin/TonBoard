import { Box } from "@mui/material";
import React from "react";

const SmallProgressBar = ({ value, outerStyle, innerStyle }) => {
  return (
    <Box
      style={{
        position: "relative",
        width: "100%",
        height: "7px",
        display: "flex",
        alignItems: "center",
        padding: "1px",
      }}
    >
      <Box
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          minHeight: "7px",
          background:
            "linear-gradient(241.27deg, rgba(253, 255, 245, 0.32) 100%, rgba(253, 255, 245, 0.16) 100%)",
          opacity: 0.6,
          borderRadius: "10px",
          zIndex: 0,
          ...outerStyle,
        }}
      />
      <Box
        style={{
          width: `${value}%`,
          transition: "width 300ms",
          height: "6px",
          background: "linear-gradient(90deg, #D1FF1A 0%, #B0DD00 100%)",
          borderRadius: "8px",
          zIndex: 1,
          ...innerStyle,
        }}
      />
    </Box>
  );
};

export default SmallProgressBar;
