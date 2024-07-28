import { Box, Button, Typography } from "@mui/material";
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
import useSlotTimer from "../hooks/useSlotTimer";
import useBackendSync from "../hooks/useBackendSync";

const Navbar = () => {
  const { viberate } = useTelegramSDK();
  // load initial game states
  const {} = useGameHook(true);
  const {} = useSlotTimer(true);
  const {} = useBackendSync(true);
  const navigate = useNavigate();
  let { pathname } = useLocation();
  const screenLoaded = useSelector((state) => state.ui.screenLoaded);

  const navLinks = [
    {
      url: "/work",
      image: (
        <img
          src={
            "https://static.vecteezy.com/system/resources/thumbnails/022/442/216/small_2x/icon-money-3d-illustration-png.png"
          }
          height={28}
          width={24}
        />
      ),

      name: "Engage",
    },
    {
      url: "/tasks",
      image: (
        <img
          src={
            "https://cdn3d.iconscout.com/3d/premium/thumb/approve-9569058-7718783.png?f=webp"
          }
          height={24}
          width={24}
        />
      ),

      name: "Tasks",
    },

    {
      url: "/",
      image: (
        <img
          src={
            "https://cdn3d.iconscout.com/3d/premium/thumb/chalk-board-6624230-5487990.png"
          }
          height={24}
          width={24}
        />
      ),

      name: "Quiz",
    },
    {
      url: "/invite",
      image: (
        <img
          src={
            "https://cdn3d.iconscout.com/3d/premium/thumb/invitation-10985234-8883909.png?f=webp"
          }
          height={24}
          width={24}
        />
      ),

      name: "Invite",
    },
    {
      url: "/dashboard",
      image: (
        <img
          src={
            "https://cdn3d.iconscout.com/3d/premium/thumb/green-house-6855144-5625017.png?f=webp"
          }
          height={24}
          width={24}
        />
      ),

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
            bottom: 7,
            right: 0,
            display: "flex",
            justifyContent: "center",
            backgroundColor: "transparent",
          }}
        >
          <Box
            style={{
              width: "90%",
              height: 60,
              background: "#000",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              backgroundColor: "#212121",
              // borderTopLeftRadius: 10,
              // borderTopRightRadius: 10,
              borderRadius: 10,
              paddingLeft: 5,
              paddingRight: 5,
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
