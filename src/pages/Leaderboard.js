import React from "react";
import { Box, Typography, Zoom } from "@mui/material";

import { useSelector } from "react-redux";
import SuccessSnackbar from "../components/SuccessSnackbar";

import useDashboardData from "../hooks/useDashboardData";
import { getNumbersInFormatOnlyMillions } from "../actions/helperFn";

// const ActionButton = ({
//   children,
//   onClick,
//   color,
//   style,
//   fontStyle,
//   disabled = false,
// }) => {
//   const theme = useTheme();
//   const md = useMediaQuery(theme.breakpoints.down("md"));
//   return (
//     <Button
//       style={{
//         minWidth: 70,
//         maxWidth: 70,
//         height: 28,
//         display: "flex",
//         alignItems: "center",
//         paddingRight: "6px",
//         textTransform: "capitalize",
//         opacity: !disabled ? 1 : 0.75,
//         ...style,
//       }}
//       onClick={onClick}
//       disabled={disabled}
//     >
//       <Typography
//         style={{
//           minWidth: "100%",
//           height: 28,
//           borderRadius: "4px",

//           fontWeight: 700,
//           fontSize: 12,
//           color: "#000",
//           whiteSpace: "nowrap",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           background: "#64FF99",
//           paddingLeft: "3px",
//           zIndex: 1,
//           ...fontStyle,
//         }}
//       >
//         {children}
//       </Typography>
//       <Box
//         style={{
//           minWidth: 20,
//           height: 20,
//           borderRadius: "3px",
//           background: "#64FF99",
//           transform: "rotate(45deg)",
//           marginLeft: -12,
//         }}
//       />
//     </Button>
//   );
// };

const SingleLeaderCard = ({ name, points, profilePic, rank }) => {
  return (
    <Box
      style={{
        width: "100%",
        minHeight: 55,
        height: "100%",
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
              "https://cdn3d.iconscout.com/3d/premium/thumb/diamond-10015389-8111588.png?f=webp"
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
                color: "#0088cc",
              }}
            >
              {getNumbersInFormatOnlyMillions(points)}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const Leaderboard = () => {
  const { rankings } = useDashboardData();
  const score = useSelector((state) => state.ui.score);
  const username = useSelector((state) => state.ui.username);
  const profilePic = useSelector((state) => state.ui.profilePic);

  return (
    <Box
      style={{
        width: "100%",
        minHeight: "calc(100vh - 100px)",
        position: "relative",
        background: "#161811",
        zIndex: 0,
      }}
    >
      <Zoom direction="down" in={true}>
        <Box>
          <SuccessSnackbar text="Reward claimed succesfully!" />

          <Box
            pt={5}
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={
                "https://cdn3d.iconscout.com/3d/premium/thumb/trophy-9211599-7568735.png"
              }
              alt=""
              height={"10%"}
              width={"40%"}
              style={{ filter: "drop-shadow(0 -6mm 14mm #BC831E)" }}
            />
            <Typography
              mt={1}
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
              Leaderboard
            </Typography>
          </Box>

          <Box
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "32px 32px 0px 0px",
              padding: "1px 1px 0",
              zIndex: 1,
            }}
          >
            <Box
              style={{
                width: "100%",
                background: "#161811",
                borderRadius: "32px 32px 0px 0px",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                gap: "5px",
                padding: "25px 5%",
                overflowY: "auto",
              }}
            >
              {rankings?.ranks?.map((ele, i) => (
                <SingleLeaderCard
                  key={i}
                  name={ele.username}
                  profilePic={ele.profilePic}
                  points={ele.score}
                  rank={ele.rank}
                />
              ))}
              {rankings?.ranks?.map((ele, i) => (
                <SingleLeaderCard
                  key={i}
                  name={ele.username}
                  profilePic={ele.profilePic}
                  points={ele.score}
                  rank={ele.rank}
                />
              ))}
              {/* <Box style={{ textAlign: "center" }}>Will be available soon</Box> */}
            </Box>
          </Box>
        </Box>
      </Zoom>
    </Box>
  );
};

export default Leaderboard;
