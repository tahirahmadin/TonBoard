import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import useTelegramSDK from "../hooks/useTelegramSDK";
import SuccessSnackbar from "../components/SuccessSnackbar";
import { setSuccessPopup } from "../reducers/UiReducers";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import constants from "../utils/constants";
import { getNumbersInFormat } from "../actions/helperFn";

import { Person } from "@mui/icons-material";
import { getReferralsData } from "../actions/serverActions";

const Referral = () => {
  const dispatch = useDispatch();
  const { telegramUserId, viberate } = useTelegramSDK(true);

  const [referralData, setReferralData] = useState(null);

  useEffect(() => {
    async function asyncFn() {
      if (telegramUserId) {
        let res = await getReferralsData(telegramUserId);
        setReferralData(res);
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
      <Box
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={"images/invite.webp"}
          alt="invite"
          width={108}
          height={108}
          style={{ filter: "drop-shadow(0 -6mm 14mm #757575)" }}
        />
        <Typography
          mb={1}
          style={{
            width: "100%",
            fontFamily: "Rubik",
            fontWeight: 600,
            fontSize: 20,
            lineHeight: "110%",
            textAlign: "center",
            color: "#ffffff",
          }}
        >
          Invite friends!
        </Typography>
        <Typography
          style={{
            width: "95%",
            textAlign: "center",
            fontSize: 14,
            lineHeight: "130%",
            color: "rgba(253, 255, 245, 0.8)",
            position: "relative",
            zIndex: 1,
          }}
        >
          Refer friends and earn +100 diamonds/friend
        </Typography>
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
            My friends list (
            {referralData && referralData.length.toLocaleString()})
          </Typography>
          <Box
            mt={1}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              gap: "5px",
              overflowY: "auto",
            }}
          >
            {referralData &&
              referralData.map((ele, i) => (
                <Box
                  key={i}
                  style={{
                    width: "100%",
                    minHeight: 53,
                    background:
                      "linear-gradient(241.27deg, rgba(253, 255, 245, 0.08) -5.59%, rgba(253, 255, 245, 0) 100%)",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
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
                        "https://cdn3d.iconscout.com/3d/premium/thumb/star-11158872-8943500.png"
                      }
                      alt=""
                      style={{
                        width: 36,
                        height: 35,
                        borderRadius: "22%",
                        backgroundColor: "#212121",
                      }}
                    />
                    <Box
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                        gap: "3px",
                      }}
                    >
                      <Typography
                        style={{
                          width: "100%",
                          fontFamily: "Rubik",
                          fontWeight: 700,
                          fontSize: 16,
                          lineHeight: "110%",
                          textAlign: "left",
                          color: "#ffffff",
                        }}
                      >
                        {ele.username}
                      </Typography>
                      <Typography
                        style={{
                          width: "100%",
                          textAlign: "center",
                          fontSize: 12,
                          lineHeight: "130%",
                          color: "rgba(253, 255, 245, 0.8)",
                          position: "relative",
                          zIndex: 1,
                          textAlign: "left",
                        }}
                      >
                        {getNumbersInFormat(ele.score)}
                      </Typography>
                    </Box>
                  </Box>
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
                        borderRadius: "6px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 14,
                        fontWeight: 700,
                        color: "#0088cc",
                      }}
                    >
                      +100
                    </Box>
                  </Box>
                </Box>
              ))}

            {referralData && referralData.length === 0 && (
              <Box textAlign={"center"}>No data found</Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Referral;
