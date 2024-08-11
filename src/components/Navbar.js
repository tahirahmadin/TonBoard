import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useTelegramSDK from "../hooks/useTelegramSDK";
import useGameHook from "../hooks/useGameHook";
import { useSelector } from "react-redux";
import { useOnline } from "../hooks/useOnline";

const Navbar = () => {
  const { viberate } = useTelegramSDK();
  // load initial game states
  const {} = useGameHook(true);

  const navigate = useNavigate();
  let { pathname } = useLocation();
  const screenLoaded = useSelector((state) => state.ui.screenLoaded);
  const isOnline = useOnline();

  const navLinks = [
    {
      url: "/work",
      image: (
        <img
          src={
            "https://cdn3d.iconscout.com/3d/premium/thumb/diamond-10015389-8111588.png?f=webp"
          }
          height={28}
          width={24}
        />
      ),

      name: "Participate",
    },

    {
      url: "/invite",
      image: (
        <img
          src={
            "https://cdn3d.iconscout.com/3d/premium/thumb/party-invitation-illustration-10404731-8399661.png?f=webp"
          }
          height={24}
          width={24}
        />
      ),

      name: "Invite",
    },

    {
      url: "/",
      image: (
        <img
          src={
            "https://cdn3d.iconscout.com/3d/premium/thumb/whiteboard-6572358-5430926.png"
          }
          height={24}
          width={24}
        />
      ),

      name: "Quiz",
    },

    {
      url: "/leader",
      image: (
        <img
          src={
            "https://cdn3d.iconscout.com/3d/premium/thumb/rating-message-6395424-5298662.png"
          }
          height={24}
          width={24}
        />
      ),

      name: "Rankings",
    },

    {
      url: "/dashboard",
      image: (
        <img
          src={
            "https://cdn3d.iconscout.com/3d/premium/thumb/home-7746313-6240836.png"
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
                    color: pathname === nav.url ? "#48A6CD" : "#FFFFFF",
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
