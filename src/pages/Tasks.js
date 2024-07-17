import React, { useMemo, useState } from "react";
import Profile from "../components/Profile";
import {
  Box,
  Button,
  CircularProgress,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { KeyboardArrowRight } from "@mui/icons-material";
import { useTheme } from "@mui/styles";
import { useServerAuth } from "../hooks/useServerAuth";
import { updateTaskStatusAPI } from "../actions/serverActions";
import useTelegramSDK from "../hooks/useTelegramSDK";
import {
  LEAGUE_LEVEL_DATA,
  LEAGUE_TASKS_DATA,
  REFERRAL_COUNT_DATA,
  REFERRAL_TASKS_DATA,
  SPECIAL_TASKS_DATA,
} from "../utils/constants";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useGameHook from "../hooks/useGameHook";
import SuccessSnackbar from "../components/SuccessSnackbar";
import {
  setSuccessPopup,
  updateSpecialTaskStatusState,
  updateLeagueTaskStatusState,
  updateRefTaskStatusState,
} from "../reducers/UiReducers";
import ProgressBar from "../components/ProgressBar";
import ScoreComp from "../components/Score";

const tabs = [
  { no: 0, name: "Special" },
  { no: 1, name: "Leagues" },
  { no: 2, name: "Ref Tasks" },
];

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

const SingleTask = ({
  taskId,
  name,
  url,
  taskNumber,
  points,
  pointsText,
  background,
  inProgress,
  setInProgress,
}) => {
  const dispatch = useDispatch();
  const { openTelegramUrl } = useTelegramSDK();
  const { accountSC } = useServerAuth();
  const { claimTaskPoints } = useGameHook();

  const specialTasksStatus = useSelector(
    (state) => state.ui.specialTasksStatus
  );

  let currentTaskStatus = () => {
    let tempValue = specialTasksStatus[taskId];
    if (tempValue === undefined) {
      return 0;
    } else {
      return tempValue;
    }
  };

  // OPEN URL - STATUS= Started
  const onClickAction = async (inputTaskId) => {
    if (currentTaskStatus() === 0 && !inProgress) {
      setInProgress(true);
      await openTelegramUrl(url);
      // Update status to progress
      let tempArray = [...specialTasksStatus];
      tempArray[inputTaskId] = 1;
      dispatch(updateSpecialTaskStatusState(tempArray));
      setTimeout(() => {
        setInProgress(false);
      }, 20000);
    }
  };

  // CLAIM REWARDS
  const onClickClaim = async () => {
    // // Update status to progress
    console.log(specialTasksStatus);
    await claimTaskPoints(points);
    let tempArray = [...specialTasksStatus];
    tempArray[taskId] = 2;
    await dispatch(updateSpecialTaskStatusState(tempArray));
  };

  return (
    <Box
      style={{
        width: "100%",
        minHeight: "55.86px",
        background: background
          ? background
          : "linear-gradient(271.44deg, #7848FF 0.29%, #346DFF 98.45%)",
        border: "0.498756px solid #FFFFFF",
        borderRadius: "12px",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 15px",
      }}
    >
      <Typography
        style={{
          fontWeight: 700,
          fontSize: "18px",
          lineHeight: "21px",
          color: "#FFFFFF",
        }}
      >
        {name}
      </Typography>
      <Typography
        style={{
          width: currentTaskStatus() === 2 ? "97px" : "83px",
          height: "22px",
          background: currentTaskStatus() === 2 ? "#018724" : "#FAFF00",
          borderRadius: "8px",

          fontWeight: 500,
          fontSize: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: currentTaskStatus() === 2 ? "#FAFF00" : "#000000",
          position: "absolute",
          bottom: -11,
        }}
      >
        {currentTaskStatus() === 2 && (
          <img src="/images/check.png" style={{ width: 16, height: 16 }} />
        )}
        +{pointsText} Points
      </Typography>

      {currentTaskStatus() === 0 && (
        <ActionButton onClick={() => onClickAction(taskId)}>Start</ActionButton>
      )}
      {currentTaskStatus() === 1 && !inProgress && (
        <ActionButton
          onClick={currentTaskStatus === 0 ? null : onClickClaim}
          disabled={currentTaskStatus === 0}
        >
          Claim
        </ActionButton>
      )}

      {currentTaskStatus() === 1 && inProgress && (
        <Box display={"flex"} justifyContent={"flex-start"}>
          <CircularProgress size={20} thickness={5} />
        </Box>
      )}

      {currentTaskStatus() === 2 && (
        <ActionButton disabled={true}>Claimed</ActionButton>
      )}
    </Box>
  );
};

const SingleNonSpecialTask = ({
  taskId,
  name,
  index,
  taskNumber,
  points,
  pointsText,
  currentTabValue,
}) => {
  const dispatch = useDispatch();
  const { claimLeagueLevel, claimReferralLevel } = useGameHook();
  const { accountSC } = useServerAuth();
  const tapScore = useSelector((state) => state.ui.tapScore);
  const leagueLevel = useSelector((state) => state.ui.leagueLevel);
  const leagueTasksStatus = useSelector((state) => state.ui.leagueTasksStatus);
  const refTasksStatus = useSelector((state) => state.ui.refTasksStatus);
  const referralCount = useSelector((state) => state.ui.referralCount);

  let currentTaskStatus = useMemo(() => {
    let tempValue = 0;
    if (currentTabValue === 1) {
      tempValue = leagueTasksStatus[taskId];
    } else {
      tempValue = refTasksStatus[taskId];
    }

    if (tempValue === undefined) {
      return 0;
    } else {
      return tempValue;
    }
  }, [taskId, currentTabValue, leagueTasksStatus, refTasksStatus]);

  let isClaimableStatus = () => {
    if (currentTabValue === 1) {
      return tapScore >= LEAGUE_LEVEL_DATA[taskId + 1].tapsRequired;
    }
    return referralCount >= REFERRAL_TASKS_DATA[taskId].referralRequired;
  };

  // Claim Rewards
  const onClickClaim = async () => {
    // Update status to progress
    let totalLevels = LEAGUE_LEVEL_DATA.length;
    if (
      currentTabValue === 1 &&
      tapScore >= points &&
      leagueLevel < totalLevels
    ) {
      await claimLeagueLevel(taskId);
      var tempArray = [...leagueTasksStatus];
      tempArray[taskId] = 2;
      await dispatch(updateLeagueTaskStatusState(tempArray));
    }
    if (currentTabValue === 2) {
      await claimReferralLevel(points);
      var tempArray = [...refTasksStatus];
      tempArray[taskId] = 2;
      await dispatch(updateRefTaskStatusState(tempArray));
    }
  };

  return (
    <Box
      style={{
        width: "100%",
        minHeight: "55.86px",
        background:
          "linear-gradient(241.27deg, rgba(253, 255, 245, 0.08) -5.59%, rgba(253, 255, 245, 0) 100%)",
        border: "0.498756px solid #FFFFFF",
        borderRadius: "12px",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 15px",
      }}
    >
      <Box
        style={{
          width: "70%",

          fontWeight: 700,
          fontSize: "18px",
          lineHeight: "21px",
          color: "#FFFFFF",
        }}
      >
        {name}

        {currentTabValue === 1 && (
          <ProgressBar
            value={(100 * tapScore) / points}
            containerStyle={{ height: 9, margin: "3px 0 10px" }}
            outerStyle={{ minHeight: 9 }}
            innerStyle={{ height: 5 }}
          />
        )}
      </Box>

      <Typography
        style={{
          width: currentTaskStatus === 2 ? "97px" : "83px",
          height: "22px",
          background: currentTaskStatus === 2 ? "#018724" : "#FAFF00",
          borderRadius: "8px",

          fontWeight: 500,
          fontSize: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: currentTaskStatus === 2 ? "#FAFF00" : "#000000",
          position: "absolute",
          bottom: -11,
        }}
      >
        {currentTaskStatus === 2 && (
          <img src="/images/check.png" style={{ width: 16, height: 16 }} />
        )}
        +{pointsText} Points
      </Typography>
      {currentTaskStatus === 2 && (
        <ActionButton disabled={true}>Claimed</ActionButton>
      )}
      {currentTaskStatus != 2 && (
        <ActionButton
          onClick={!isClaimableStatus() ? null : onClickClaim}
          disabled={!isClaimableStatus()}
        >
          Claim
        </ActionButton>
      )}
    </Box>
  );
};
const Tasks = () => {
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
        minHeight: "calc(100vh - 60px)",
        position: "relative",
        background: "#161811",
        paddingTop: "25px",
        zIndex: 0,
      }}
    >
      <Box>
        <SuccessSnackbar text="Reward claimed succesfully!" />
        <img
          src="/images/bg_grid.png"
          alt="Foodverse"
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

        <Box
          style={{
            width: "90%",
            height: "87px",
            padding: "1px",
            marginTop: "15px",
            marginLeft: "5%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "5px",
          }}
        >
          <ScoreComp />

          <Link to="/league">
            <Box
              style={{
                width: "max-content",
                minWidth: 115,
                height: 28,
                background:
                  leagueLevel === 1
                    ? "#9EAB08"
                    : leagueLevel === 2
                    ? "#1CB172"
                    : leagueLevel === 3
                    ? "#0DB2BC"
                    : leagueLevel === 4
                    ? "#5339EF"
                    : leagueLevel === 5
                    ? "#AA2CD6"
                    : leagueLevel === 6
                    ? "#D62C88"
                    : leagueLevel === 7
                    ? "#FF5C00"
                    : leagueLevel === 8
                    ? "#D1BD07"
                    : leagueLevel === 9
                    ? "#59B200"
                    : "#D6672C",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingLeft: "5px",
                borderRadius: "8px",
              }}
            >
              <Box
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: "2px",

                  fontWeight: 700,
                  fontSize: "14px",
                  lineHeight: "16px",
                  color: "#FFFFFF",
                  whiteSpace: "nowrap",
                }}
              >
                <img
                  src={LEAGUE_LEVEL_DATA[leagueLevel].img}
                  style={{
                    width: 26,
                    height: 24,
                    objectFit: "contain",
                    transform:
                      leagueLevel % 2 == 0 ? "rotate(-15deg)" : "rotate(15deg)",
                  }}
                />
                {LEAGUE_LEVEL_DATA[leagueLevel].title}
              </Box>
              <KeyboardArrowRight style={{ color: "#fff" }} />
            </Box>
          </Link>
        </Box>

        <Box
          style={{
            width: "90%",
            height: 52,
            borderRadius: "6px",
            display: "flex",
            alignItems: "center",
            gap: "5px",
            padding: "5px",
            margin: "5% 5% 7%",
            position: "relative",
          }}
        >
          <Box
            style={{
              width: "100%",
              height: 52,
              background: "linear-gradient(180deg, #7848FF 0%, #346DFF 100%)",
              borderRadius: "6px",
              padding: "1px",
              top: 0,
              left: 0,
              position: "absolute",
              zIndex: -2,
            }}
          >
            <Box
              style={{
                width: "100%",
                height: "100%",
                background: "#161811",
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                gap: "5px",
                padding: "5px",
              }}
            />
          </Box>
          {tabs.map((ele, i) => (
            <Button
              key={ele.no}
              style={{
                width: "100%",
                height: "100%",
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "11px",
                textAlign: "center",
                color: tabValue === ele.no ? "#000000" : "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: tabValue === ele.no ? "#FF9CFF" : "",
                borderRadius: "8px",
                position: "relative",
                zIndex: 3,
                textTransform: "capitalize",
              }}
              onClick={() => {
                viberate("light");
                setTabValue(ele.no);
              }}
            >
              {ele.name}
              {tabValue !== ele.no && (
                <span
                  style={{
                    width: "7px",
                    height: "7px",
                    borderRadius: "50%",
                    background: "#FF4C4C",
                    position: "absolute",
                    top: 7,
                    right: 13,
                    zIndex: 3,
                  }}
                />
              )}
            </Button>
          ))}
        </Box>
        {tabValue === 0 && (
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
                gap: "18px",
                padding: "25px 5%",
                overflowY: "auto",
              }}
            >
              {SPECIAL_TASKS_DATA.map((ele, i) => (
                <SingleTask
                  key={i}
                  taskId={ele.id}
                  taskNumber={ele.taskNumber}
                  name={ele.title}
                  url={ele.url}
                  points={ele.points}
                  pointsText={ele.pointsText}
                  inProgress={inProgress}
                  setInProgress={setInProgress}
                />
              ))}
              {SPECIAL_TASKS_DATA.length === 0 && (
                <Box style={{ textAlign: "center" }}>No tasks found</Box>
              )}
            </Box>
          </Box>
        )}
        {tabValue !== 0 && (
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
                gap: "18px",
                padding: "25px 5%",
                overflowY: "auto",
                paddingBottom: 150,
              }}
            >
              {tabValue === 1 &&
                LEAGUE_TASKS_DATA.map((ele, i) => {
                  return (
                    leagueTasksStatus[ele.id] !== 2 && (
                      <SingleNonSpecialTask
                        key={i}
                        index={i}
                        taskId={ele.id}
                        taskNumber={ele.taskNumber}
                        name={ele.title}
                        pointsText={ele.pointsText}
                        points={ele.points}
                        currentTabValue={tabValue}
                      />
                    )
                  );
                })}
              {tabValue === 2 &&
                REFERRAL_TASKS_DATA.map((ele, i) => (
                  <SingleNonSpecialTask
                    key={i}
                    index={i}
                    taskId={ele.id}
                    taskNumber={ele.taskNumber}
                    name={ele.title}
                    points={ele.points}
                    pointsText={ele.pointsText}
                    currentTabValue={tabValue}
                  />
                ))}

              {REFERRAL_TASKS_DATA.length === 0 && (
                <Box style={{ textAlign: "center" }}>No tasks found</Box>
              )}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Tasks;
