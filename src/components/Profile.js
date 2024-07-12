import { Box, Typography } from "@mui/material";
import React from "react";
import useTelegramSDK from "../hooks/useTelegramSDK";

const Profile = () => {
  const { telegramUsername, telegramPhotoUrl } = useTelegramSDK();

  return (
    <Box
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        flexDirection: "row",
      }}
    >
      <img
        src="https://cdn3d.iconscout.com/3d/premium/thumb/manager-10946991-8770014.png"
        style={{
          width: 36,
          height: 36,
          backgroundColor: "#212121",
          borderRadius: 10,
          padding: 4,
        }}
      />
      <Typography
        style={{
          fontFamily: "Rubik",
          fontWeight: 500,
          fontSize: 12,
          lineHeight: "110%",
          textAlign: "center",
          color: "#ffffff",
          paddingLeft: 8,
        }}
      >
        Tahir Ahmad
      </Typography>
    </Box>
  );
};

export default Profile;
