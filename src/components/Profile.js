import { Box, Typography } from "@mui/material";
import React from "react";
import useTelegramSDK from "../hooks/useTelegramSDK";
import SmallProgressBar from "./SmallProgressBar";

const Profile = () => {
  const { telegramUsername, telegramPhotoUrl } = useTelegramSDK();

  return (
    <Box
      mt={1}
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          backgroundColor: "#212121",
          borderTopRightRadius: 25,
          borderBottomRightRadius: 25,
          paddingRight: 30,
          paddingLeft: 7,
          paddingTop: 7,
          paddingBottom: 7,
        }}
      >
        <img
          src={
            "https://cdn3d.iconscout.com/3d/premium/thumb/character-11212176-8973527.png?f=webp"
          }
          alt="TaskDao"
          width={30}
          height={30}
        />
        <Box>
          <Typography
            style={{
              width: "100%",
              fontFamily: "'Rubik'",
              fontWeight: 500,
              fontSize: 10,
              lineHeight: "110%",
              textAlign: "center",
              color: "#ffffff",
              marginBottom: 3,
            }}
          >
            Senior Manager 6/9
          </Typography>
          <SmallProgressBar value={60} />
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
