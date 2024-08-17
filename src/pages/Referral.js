import React from "react";
import { Box, Button, Typography } from "@mui/material";
import useTelegramSDK from "../hooks/useTelegramSDK";
import SuccessSnackbar from "../components/SuccessSnackbar";
import { setSuccessPopup } from "../reducers/UiReducers";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import constants from "../utils/constants";
import { getNumbersInFormat } from "../actions/helperFn";

import { Person } from "@mui/icons-material";

const Referral = () => {
  const dispatch = useDispatch();
  const { telegramUserId, viberate } = useTelegramSDK(true);
  const referrals = [];

  const handleCopyToClipboard = () => {
    if (telegramUserId) {
      navigator.clipboard
        .writeText(`${constants.botUrl}${telegramUserId}`)
        .then(
          function () {
            viberate("light");
            https: console.log("Async: Copying to clipboard was successful!");
            dispatch(setSuccessPopup(true));
          },
          function (err) {
            console.error("Async: Could not copy text: ", err);
          }
        );
    }
  };

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
      <SuccessSnackbar text="Invite link copied!" />
      <Typography
        mb={1}
        style={{
          width: "100%",
          fontFamily: "Rubik",
          fontWeight: 600,
          fontSize: 28,
          lineHeight: "110%",
          textAlign: "center",
          color: "#ffffff",
        }}
      >
        Invite friends!
      </Typography>

      <Typography
        style={{
          textAlign: "center",
          marginBottom: 10,
        }}
      >
        You and your friend will recieve bonuses
      </Typography>

      <Box
        style={{
          width: "100%",
          height: "100%",
          minHeight: "calc(100vh - 222px)",
          borderRadius: "32px 32px 0px 0px",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          gap: "25px",
          padding: "25px 5% 75px",
        }}
      >
        <Box
          style={{
            width: "100%",

            gap: "5px",
            background: "rgba(253, 255, 245, 0.08)",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "12px 15px",
            borderRadius: "12px",
          }}
        >
          <Box
            style={{
              fontWeight: 600,
              fontSize: 18,
              lineHeight: "130%",
              color: "#ffffff",
              maxWidth: 200,
            }}
          >
            Invite friends
          </Box>
          <Box
            style={{
              display: "flex",
              alignItems: "flex-end",
              flexDirection: "row",
              gap: "7px",
            }}
          >
            <Link
              to={`https://t.me/share/url?url=${constants.botUrl}${telegramUserId}`}
            >
              <Button
                style={{
                  height: "40px",
                  background: "#0088cc",
                  borderRadius: "12px",
                  fontWeight: 600,
                  fontSize: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  textTransform: "none",
                  paddingLeft: 20,
                  paddingRight: 20,
                }}
              >
                Invite a friend <Person />
              </Button>
            </Link>
            <Button
              onClick={handleCopyToClipboard}
              style={{
                height: "40px",
                background: "#0088cc",
                borderRadius: "12px",
                fontWeight: 600,
                fontSize: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                paddingLeft: 20,
                paddingRight: 20,
              }}
            >
              Copy
            </Button>
          </Box>
        </Box>

        <Box
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          <Typography
            style={{
              fontWeight: 600,
              fontSize: "16px",
              lineHeight: "150%",
              color: "#ffffff",
            }}
          >
            My friends list ({referrals && referrals.length.toLocaleString()})
          </Typography>
          <Box
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              overflowY: "auto",
            }}
          >
            {referrals.map((ele, i) => (
              <Box
                key={i}
                style={{
                  width: "100%",
                  minHeight: 55,
                  height: "100%",
                  background:
                    "linear-gradient(180deg, rgba(255, 255, 255, 0.3) 0%, rgba(149, 149, 149, 0.3) 50%, rgba(227, 227, 227, 0.3) 100%)",
                  borderRadius: "12px",
                  padding: "1px",
                }}
              >
                <Box
                  style={{
                    width: "100%",
                    minHeight: 53,
                    background: "#2B2D25",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "0 15px",
                  }}
                >
                  <Box
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <img
                      src={
                        "https://cdn3d.iconscout.com/3d/premium/thumb/man-6530464-5823043.png"
                      }
                      alt=""
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: "20%",
                        backgroundColor: "#212121",
                        padding: 3,
                      }}
                    />
                    <Box
                      style={{
                        fontFamily: "Rubik",
                        fontStyle: "normal",
                        fontWeight: 500,
                        fontSize: "14px",
                        lineHeight: "16px",
                        color: "#FFFFFF",
                        opacity: 1,
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                        gap: "3px",
                      }}
                    >
                      @{ele.username ? ele.username : "User"}
                    </Box>
                  </Box>
                  {ele.points && (
                    <Box
                      style={{
                        minWidth: "60px",
                        width: "fit-content",
                        height: "24px",
                        borderRadius: "6px",
                        padding: "1px",
                      }}
                    >
                      <Box
                        style={{
                          width: "100%",
                          height: "100%",
                          background: "#2B2D25",
                          borderRadius: "6px",
                        }}
                      >
                        <Box
                          style={{
                            width: "100%",
                            height: "100%",
                            background:
                              "linear-gradient(241.27deg, rgba(253, 255, 245, 0.08) -5.59%, rgba(253, 255, 245, 0) 100%)",
                            borderRadius: "6px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 14,
                            fontWeight: 800,
                            color: "#64FF99",
                          }}
                        >
                          +{getNumbersInFormat(ele.points)}
                        </Box>
                      </Box>
                    </Box>
                  )}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Referral;
