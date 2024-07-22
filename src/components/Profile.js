import { Box, Typography } from "@mui/material";
import React from "react";
import useTelegramSDK from "../hooks/useTelegramSDK";
import SmallProgressBar from "./SmallProgressBar";
import { useSelector } from "react-redux";
import { LEAGUE_TASKS_DATA } from "../utils/constants";

const Profile = () => {
  const { telegramUsername, telegramPhotoUrl } = useTelegramSDK();
  const leagueLevel = useSelector((state) => state.ui.leagueLevel);

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
          borderTopRightRadius: 12,
          borderBottomRightRadius: 12,
          paddingRight: 20,
          paddingLeft: 7,
          paddingTop: 7,
          paddingBottom: 7,
        }}
      >
        <img
          src={LEAGUE_TASKS_DATA[leagueLevel].img}
          alt="TaskDao"
          width={24}
          height={24}
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
            {LEAGUE_TASKS_DATA[leagueLevel].title} (0/5)
          </Typography>
          <SmallProgressBar value={60} />
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
