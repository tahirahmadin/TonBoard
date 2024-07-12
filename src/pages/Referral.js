import React, { useEffect, useState } from "react";
import Profile from "../components/Profile";
import { Box, Button, Typography } from "@mui/material";
import { useServerAuth } from "../hooks/useServerAuth";
import useTelegramSDK from "../hooks/useTelegramSDK";
import { getReferralsData } from "../actions/serverActions";
import SuccessSnackbar from "../components/SuccessSnackbar";
import { setSuccessPopup } from "../reducers/UiReducers";
import { useDispatch } from "react-redux";

const Referral = () => {
  const dispatch = useDispatch();
  const { telegramUserId, WebAppSDK, viberate } = useTelegramSDK();

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
        }
        setPageLoaded(true);
      }
    }
    asyncFn();
  }, [telegramUserId]);

  const handleCopyToClipboard = () => {
    if (telegramUserId) {
      navigator.clipboard
        .writeText(`https://t.me/taskdao/game?startapp=${telegramUserId}`)
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
        minHeight: "calc(100vh - 60px)",
        position: "relative",
        background: "#161811",
        paddingTop: "25px",
        zIndex: 0,
      }}
    >
      <SuccessSnackbar text="Invite link copied!" />
      <img
        src="/images/bg_grid.png"
        alt="TaskDao"
        className="portrait"
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          zIndex: -1,
          top: 0,
          left: 0,
          objectFit: "cover",
        }}
      />
      <Profile />
      <Box
        style={{
          width: "90%",
          height: "87px",
          background: "linear-gradient(180deg, #FF97FF 0%, #CC37CC 100%)",
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
            Your Referrals
          </Typography>
          <Typography
            style={{
              fontWeight: 600,
              fontSize: "40px",
              lineHeight: "100%",
              color: "#FF9CFF",
            }}
          >
            {allReferrals && allReferrals.length.toLocaleString()}
          </Typography>
        </Box>
      </Box>
      <Box
        style={{
          width: "100%",
          height: 121,
          display: "flex",
          justifyContent: "center",
          marginTop: "-20px",
        }}
      >
        <img
          src="https://png.pngtree.com/png-clipart/20220612/original/pngtree-dollar-coin-icon-3d-png-image_7966148.png"
          style={{
            width: 340,
            height: 121,
            objectFit: "contain",
            zIndex: 1,
          }}
        />
      </Box>
      <Box
        style={{
          width: "100%",
          height: "100%",
          background: "linear-gradient(180deg, #4886FF 0%, #03429F 100%)",
          borderRadius: "32px 32px 0px 0px",
          padding: "1px 1px 0",
          marginTop: "-7px",
          zIndex: 1,
        }}
      >
        <Box
          style={{
            width: "100%",
            height: "calc(100vh - 333px)",
            background: "#2B2D25",
            borderRadius: "32px 32px 0px 0px",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            gap: "5px",
            padding: "25px 5%",
          }}
        >
          <Box
            style={{
              width: "100%",
              height: "84px",
              background: "linear-gradient(180deg, #7848FF 0%, #346DFF 100%)",
              borderRadius: "12px",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: "15px",
              padding: "15px",
            }}
          >
            <Box
              style={{
                fontWeight: 600,
                fontSize: "16px",
                lineHeight: "150%",
                color: "#FAFF00",
                maxWidth: 200,
              }}
            >
              My Referral Link
              <br />
              <Typography
                style={{
                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: "16px",
                  color: "#FFFFFF",
                  opacity: 0.8,
                  wordBreak: "break-all",
                }}
              >
                {`https://t.me/TaskDao/game?startapp=${telegramUserId}`}
              </Typography>
            </Box>
            <Button
              onClick={handleCopyToClipboard}
              style={{
                width: "82px",
                height: "27px",
                background: "#FAFF00",
                borderRadius: "8px",
                fontWeight: 600,
                fontSize: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#000",
              }}
            >
              COPY
            </Button>
          </Box>

          <Box
            style={{
              width: "100%",
              height: "100%",
              maxHeight: 245,
              background:
                "linear-gradient(180deg, rgba(255, 255, 255, 0.3) 0%, rgba(149, 149, 149, 0.3) 50%, rgba(227, 227, 227, 0.3) 100%)",
              borderRadius: "12px",
              marginTop: "5%",
              padding: "1px",
            }}
          >
            <Box
              style={{
                width: "100%",
                height: "100%",
                background: "#2B2D25",
                borderRadius: "12px",
              }}
            >
              <Box
                style={{
                  width: "100%",
                  height: "100%",
                  background:
                    "linear-gradient(241.27deg, rgba(253, 255, 245, 0.08) -5.59%, rgba(253, 255, 245, 0) 100%)",
                  borderRadius: "12px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "15px",
                  padding: "15px",
                  overflow: "hidden",
                }}
              >
                <Typography
                  style={{
                    fontWeight: 600,
                    fontSize: "16px",
                    lineHeight: "150%",
                    color: "#FAFF00",
                  }}
                >
                  My Referrals
                </Typography>
                <Box
                  style={{
                    width: "100%",
                    height: "100%",
                    maxHeight: 175,
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    overflowY: "auto",
                    padding: "5px 15px 5px 0",
                  }}
                >
                  {allReferrals.map((ele, i) => (
                    <Box
                      key={i}
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
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
                          src={ele.profilePic}
                          style={{ width: 24, height: 24, borderRadius: "50%" }}
                        />
                        <Typography
                          style={{
                            fontWeight: 400,
                            fontSize: "14px",
                            lineHeight: "16px",
                            color: "#FFFFFF",
                            opacity: 0.8,
                          }}
                        >
                          @{ele.username}
                        </Typography>
                      </Box>
                      <Box
                        style={{
                          width: "80px",
                          height: "22px",
                          background:
                            "linear-gradient(180deg, #089B89 0%, #036860 100%)",
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
                              fontSize: 12,
                              fontWeight: 800,
                              color: "#64FF99",
                            }}
                          >
                            +5K
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Referral;
