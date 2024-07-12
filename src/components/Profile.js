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
        justifyContent: "flex-end",
        gap: "5px",
        paddingRight: "5%",
      }}
    >
      <Box>
        <Typography
          style={{
            color: "white",
            textAlign: "right",

            fontWeight: 800,
            fontSize: 13,
            lineHeight: "110%",
          }}
        >
          Hello,
          <br />
          <span style={{ color: "#64ff99", textTransform: "lowercase" }}>
            {telegramUsername}
          </span>
        </Typography>
      </Box>

      <Box
        style={{
          minWidth: 50,
          height: 50,
          position: "relative",
          cursor: "pointer",
        }}
      >
        <img
          src={
            telegramPhotoUrl
              ? telegramPhotoUrl
              : "https://cdn3d.iconscout.com/3d/premium/thumb/manager-10946991-8770014.png"
          }
          alt="TaskDao"
          className="portrait"
          width={40}
          height={40}
          style={{
            position: "absolute",
            borderRadius: "50%",
            zIndex: 2,
            top: 5,
            left: 5,
          }}
        />

        <img
          src={"images/profile.png"}
          alt="TaskDao"
          width={50}
          height={50}
          style={{
            position: "absolute",
            zIndex: 1,
            borderRadius: "50%",
          }}
        />
      </Box>
    </Box>
  );
};

export default Profile;
