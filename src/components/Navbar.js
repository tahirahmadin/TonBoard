import { Box, Button, Grow, Typography } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useTelegramSDK from "../hooks/useTelegramSDK";
import useGameHook from "../hooks/useGameHook";
import { useSelector } from "react-redux";
import {
  Analytics,
  Balance,
  Dashboard,
  Group,
  Money,
  TapAndPlay,
  TaskSharp,
} from "@mui/icons-material";

const Navbar = () => {
  const { viberate } = useTelegramSDK();
  const { gamePercentageLeft, updateOnTapAction } = useGameHook(true);
  const navigate = useNavigate();
  let { pathname } = useLocation();
  const screenLoaded = useSelector((state) => state.ui.screenLoaded);

  const navLinks = [
    {
      url: "/work",
      image: <TaskSharp color="success" />,
      imageActive: <TaskSharp />,
      name: "Work",
    },
    {
      url: "/tasks",
      image: <Balance />,
      imageActive: <Balance />,
      name: "Tasks",
    },
    {
      url: "/",
      image: <Analytics />,
      imageActive: <Analytics />,
      name: "Tap",
    },
    {
      url: "/boost",
      image: <Group />,
      imageActive: <Group />,
      name: "Boost",
    },
    {
      url: "/dashboard",
      image: <Group />,
      imageActive: <Group />,
      name: "Dashboard",
    },
  ];

  return (
    <>
      {screenLoaded && (
        <Box
          style={{
            position: "fixed",
            left: 0,
            bottom: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            backgroundColor: "transparent",
          }}
        >
          <Box
            style={{
              width: "90%",
              height: 55,
              background: "#000",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              backgroundColor: "#212121",
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
          >
            {navLinks.map((nav, i) => (
              <Button
                key={i}
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  position: "relative",
                  backgroundColor:
                    pathname === nav.url ? "black" : "transparent",
                  borderRadius: 10,
                  height: 50,
                }}
                onClick={() => {
                  viberate("light");
                  navigate(nav.url);
                }}
              >
                {nav.image}
                <Typography
                  variant="body1"
                  textTransform={"Capitalize"}
                  style={{
                    fontWeight: pathname === nav.url ? 700 : 400,
                    fontSize: 11,
                    color: pathname === nav.url ? "#64FF99" : "#FFFFFF",
                  }}
                >
                  {nav.name}
                </Typography>
              </Button>
            ))}
          </Box>
        </Box>
      )}
    </>
  );
};

export default Navbar;
