import React, { useState } from "react";
import { Box, Button, Typography, Zoom } from "@mui/material";
import SuccessSnackbar from "../components/SuccessSnackbar";
import { getNumbersInFormatOnlyMillions } from "../actions/helperFn";
import useTelegramSDK from "../hooks/useTelegramSDK";

const SingleLeaderCard = ({ name, points, rank }) => {
  return (
    <Box
      style={{
        width: "100%",
        minHeight: 53,
        background:
          "linear-gradient(241.27deg, rgba(253, 255, 245, 0.08) -5.59%, rgba(253, 255, 245, 0) 100%)",
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
          {name}
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
          {getNumbersInFormatOnlyMillions(points)}
        </Box>
      </Box>
    </Box>
  );
};

const Leaderboard = () => {
  const { viberate } = useTelegramSDK();
  const [tabValue, setTabValue] = useState(0);

  const rankings = [];

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
      <Zoom direction="down" in={true}>
        <Box>
          <SuccessSnackbar text="Reward claimed succesfully!" />

          <Box
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* https://cdn3d.iconscout.com/3d/premium/thumb/exclusive-6410046-5272919.png */}
            <img
              src={
                "https://cdn3d.iconscout.com/3d/premium/thumb/trophy-9211599-7568735.png"
              }
              alt=""
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
              Leaderboard
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
                minHeight: 60,
              }}
            >
              Refer friends and share rewards from <br />a pool of 1000 TON.
            </Typography>
          </Box>

          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              backgroundColor: "transparent",
            }}
          >
            <Box
              style={{
                width: "70%",
                height: 44,
                background: "#000",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                backgroundColor: "#212121",
                borderRadius: 10,
                paddingLeft: 6,
                paddingRight: 6,
              }}
            >
              {["Quiz", "Friends"].map((ele, i) => (
                <Button
                  key={i}
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    position: "relative",
                    backgroundColor: tabValue === i ? "black" : "transparent",

                    borderRadius: 10,
                    height: 36,
                  }}
                  onClick={() => {
                    viberate("light");
                    setTabValue(i);
                  }}
                >
                  <Typography
                    variant="body1"
                    textTransform={"Capitalize"}
                    style={{
                      fontWeight: tabValue === i ? 700 : 400,
                      fontSize: 12,
                      color: tabValue === i ? "#ffffff" : "#FFFFFF",
                    }}
                  >
                    {ele}
                  </Typography>
                </Button>
              ))}
            </Box>
          </Box>
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
            <SingleLeaderCard
              key={0}
              name={"Tahir Ahmad"}
              profilePic={null}
              points={433223}
              rank={1}
            />
            <SingleLeaderCard
              key={0}
              name={"Aamir Alam"}
              points={31242}
              rank={2}
            />
            <SingleLeaderCard
              key={0}
              name={"Anthony Singh"}
              points={31242}
              rank={3}
            />
            <SingleLeaderCard
              key={0}
              name={"Anthony Singh"}
              points={31242}
              rank={3}
            />
            {rankings?.ranks?.map((ele, i) => (
              <SingleLeaderCard
                key={i}
                name={ele.username}
                points={ele.score}
                rank={ele.rank}
              />
            ))}

            {/* <Box style={{ textAlign: "center" }}>Will be available soon</Box> */}
          </Box>
        </Box>
      </Zoom>
    </Box>
  );
};

export default Leaderboard;
