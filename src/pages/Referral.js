import React, { useEffect, useState } from "react";
import Profile from "../components/Profile";
import { Box, Button, Typography } from "@mui/material";
import { useServerAuth } from "../hooks/useServerAuth";
import useTelegramSDK from "../hooks/useTelegramSDK";
import { getReferralsData } from "../actions/serverActions";
import SuccessSnackbar from "../components/SuccessSnackbar";
import {
  setSuccessPopup,
  updateReferralCount,
  updateReferralPoints,
} from "../reducers/UiReducers";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import constants, { LEAGUE_LEVEL_DATA } from "../utils/constants";
import { getNumbersInFormat } from "../actions/helperFn";

const Referral = () => {
  const dispatch = useDispatch();
  const { telegramUserId, WebAppSDK, viberate } = useTelegramSDK(true);

  const [allReferrals, setAllReferrals] = useState([]);
  const [pageLoaded, setPageLoaded] = useState(false);

  // API call: to fetch tasks
  useEffect(() => {
    async function asyncFn() {
      if (telegramUserId) {
        let res = await getReferralsData(telegramUserId);
        console.log(res);

        if (res) {
          setAllReferrals(res);
          await dispatch(updateReferralCount(res.length));

          let pointsSum = res.reduce((a, b) => a + b.points, 0);

          await dispatch(updateReferralCount(res.length));
          await dispatch(updateReferralPoints(pointsSum));
        }
        setPageLoaded(true);
      }
    }
    asyncFn();
  }, [telegramUserId]);

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
        minHeight: "calc(100vh - 0px)",
        position: "relative",
        background: "#161811",
        paddingTop: "25px",
        zIndex: 0,
      }}
    >
      <SuccessSnackbar text="Invite link copied!" />

      <Box
        style={{
          width: "90%",
          height: "87px",
          background: "linear-gradient(180deg, #64FF99 0%, #64FF99 100%)",
          borderRadius: "24px",
          padding: "1px",
          marginTop: "15px",
          marginLeft: "5%",
        }}
      >
        <Box
          style={{
            width: "100%",
            height: "100%",
            background: "#2B2D25",
            borderRadius: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "5px",
          }}
        >
          <Typography
            style={{ fontWeight: 400, fontSize: "16px", lineHeight: "19px" }}
          >
            Your Squad
          </Typography>
          <Typography
            style={{
              fontFamily: "'Rubik'",
              fontWeight: 600,
              fontSize: "40px",
              lineHeight: "100%",
              color: "#64FF99",
            }}
          >
            {allReferrals && allReferrals.length.toLocaleString()}
          </Typography>
        </Box>
      </Box>

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
            height: "84px",
            gap: "5px",
            background:
              "linear-gradient(241.27deg, rgba(253, 255, 245, 0.08) -5.59%, rgba(253, 255, 245, 0) 100%)",
            border: "1px solid #414141",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "8px 15px",
            borderRadius: "12px",
          }}
        >
          <Box
            style={{
              fontWeight: 600,
              fontSize: "15px",
              lineHeight: "130%",
              color: "#64FF99",
              maxWidth: 200,
            }}
          >
            Invite friends
            <br />
            <Typography
              style={{
                fontWeight: 400,
                fontSize: "12px",
                lineHeight: "14px",
                color: "#FFFFFF",
                opacity: 0.8,
                wordBreak: "break-all",
                marginTop: "5px",
                maxWidth: 175,
              }}
            >
              {`${constants.botUrl}${telegramUserId}`}
            </Typography>
          </Box>
          <Box
            style={{
              display: "flex",
              alignItems: "flex-end",
              flexDirection: "column",
              gap: "7px",
            }}
          >
            <Button
              onClick={handleCopyToClipboard}
              style={{
                width: "82px",
                height: "27px",
                background: "white",
                borderRadius: "8px",
                fontWeight: 600,
                fontSize: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#000",
              }}
            >
              Copy
            </Button>
            <Link
              to={`https://t.me/share/url?url=${constants.botUrl}${telegramUserId}`}
            >
              <Button
                style={{
                  width: "82px",
                  height: "27px",
                  background: "transparent",
                  borderRadius: "8px",
                  fontWeight: 600,
                  fontSize: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  border: "1px solid white",
                }}
              >
                SHARE
              </Button>
            </Link>
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
            My Referrals
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
            {allReferrals.map((ele, i) => (
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
