import React, { useMemo, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Grow,
  Slide,
  Typography,
  useMediaQuery,
  Zoom,
} from "@mui/material";
import { useTheme } from "@mui/styles";
import { useServerAuth } from "../hooks/useServerAuth";
import useTelegramSDK from "../hooks/useTelegramSDK";
import {
  LEAGUE_TASKS_DATA,
  REFERRAL_TASKS_DATA,
  SPECIAL_TASKS_DATA,
} from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import useGameHook from "../hooks/useGameHook";
import SuccessSnackbar from "../components/SuccessSnackbar";
import {
  updateSpecialTaskStatusState,
  updateRefTaskStatusState,
} from "../reducers/UiReducers";
import ScoreComp from "../components/Score";
import {
  getNumbersInFormat,
  getNumbersInFormatOnlyMillions,
} from "../actions/helperFn";

const ActionButton = ({
  children,
  onClick,
  color,
  style,
  fontStyle,
  disabled = false,
}) => {
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Button
      style={{
        minWidth: 70,
        maxWidth: 70,
        height: 28,
        display: "flex",
        alignItems: "center",
        paddingRight: "6px",
        textTransform: "capitalize",
        opacity: !disabled ? 1 : 0.75,
        ...style,
      }}
      onClick={onClick}
      disabled={disabled}
    >
      <Typography
        style={{
          minWidth: "100%",
          height: 28,
          borderRadius: "4px",

          fontWeight: 700,
          fontSize: 12,
          color: "#000",
          whiteSpace: "nowrap",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#64FF99",
          paddingLeft: "3px",
          zIndex: 1,
          ...fontStyle,
        }}
      >
        {children}
      </Typography>
      <Box
        style={{
          minWidth: 20,
          height: 20,
          borderRadius: "3px",
          background: "#64FF99",
          transform: "rotate(45deg)",
          marginLeft: -12,
        }}
      />
    </Button>
  );
};

const SingleLeaderCard = ({}) => {
  const dispatch = useDispatch();
  const { openTelegramUrl } = useTelegramSDK();
  const { accountSC } = useServerAuth();

  return (
    <Box
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
            Tahir Ahmad
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
                color: "#64FF99",
              }}
            >
              +{getNumbersInFormatOnlyMillions(10000)}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const Leaderboard = () => {
  const topTabs = ["Social", "Referrals"];

  const { viberate } = useTelegramSDK();
  const { gameScore } = useGameHook();
  const score = useSelector((state) => state.ui.score);
  const leagueLevel = useSelector((state) => state.ui.leagueLevel);
  const leagueTasksStatus = useSelector((state) => state.ui.leagueTasksStatus);

  const [tabValue, setTabValue] = useState(0);

  //Tasks states
  const [inProgress, setInProgress] = useState(false);

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
              height={"10%"}
              width={"40%"}
              style={{ filter: "drop-shadow(0 -6mm 14mm #BC831E)" }}
            />
            <Typography
              mt={1}
              style={{
                width: "100%",
                fontFamily: "Rubik",
                fontWeight: 700,
                fontSize: 28,
                lineHeight: "110%",
                textAlign: "center",
                color: "#ffffff",
              }}
            >
              Wall of Fame
            </Typography>
            <Box
              style={{
                width: "100%",
                background: "#161811",
                borderRadius: "32px 32px 0px 0px",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                gap: "5px",
                padding: "10px 5%",
                overflowY: "auto",
              }}
            >
              <SingleLeaderCard key={0} name={"You"} points={"10M"} />
            </Box>
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
              <Typography
                style={{
                  width: "100%",
                  fontFamily: "Rubik",
                  fontWeight: 500,
                  fontSize: 18,
                  textAlign: "left",
                  color: "#ffffff",
                  paddingBottom: 5,
                }}
              >
                Leaderboard
              </Typography>
              {SPECIAL_TASKS_DATA.map((ele, i) => (
                <SingleLeaderCard
                  key={i}
                  taskId={ele.id}
                  taskNumber={ele.taskNumber}
                  name={ele.title}
                  url={ele.url}
                  points={ele.points}
                  inProgress={inProgress}
                  setInProgress={setInProgress}
                />
              ))}
              <Box style={{ textAlign: "center" }}>Will be available soon</Box>
            </Box>
          </Box>
        </Box>
      </Zoom>
    </Box>
  );
};

export default Leaderboard;
