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
import makeStyles from "@mui/styles/makeStyles";
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
import { getNumbersInFormatOnlyMillions } from "../actions/helperFn";
import TaskRewardComp from "../components/TaskRewardComp";

const useStyles = makeStyles((theme) => ({
  description: {
    width: "100%",
    textAlign: "center",
    fontSize: 14,
    lineHeight: "130%",
    color: "rgba(253, 255, 245, 0.8)",
    position: "relative",
    zIndex: 1,
  },
}));

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
          width: "100%",
          height: 28,
          borderRadius: "4px",
          fontWeight: 700,
          fontSize: 12,
          color: "#000",
          whiteSpace: "nowrap",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#64FF99",
          paddingLeft: 10,
          paddingRight: 10,
        }}
      >
        {children}
      </Typography>
    </Button>
  );
};

const SingleTask = ({
  taskId,
  name,
  url,
  points,
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
    let tempValue = specialTasksStatus?.[taskId];
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
        background:
          "linear-gradient(241.27deg, rgba(253, 255, 245, 0.08) -5.59%, rgba(253, 255, 245, 0) 100%)",
        border: "1px solid #414141",
        borderRadius: "12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "8px 15px",
      }}
    >
      <Box>
        <Typography
          style={{
            fontWeight: 700,
            fontSize: "18px",
            lineHeight: "21px",
            color: "#ffffff",
          }}
        >
          {name}
        </Typography>
        <Typography
          style={{
            borderRadius: "8px",
            fontWeight: 500,
            fontSize: "12px",
            textAlign: "left",
            color: currentTaskStatus() === 2 ? "#FAFF00" : "#ffffff",
          }}
        >
          {currentTaskStatus() === 2 && (
            <img src="/images/check.png" style={{ width: 16, height: 16 }} />
          )}
          <img
            src={
              "https://cdn3d.iconscout.com/3d/premium/thumb/cash-bonus-on-online-shopping-11964562-9764218.png?f=webp"
            }
            height={22}
            width={22}
          />{" "}
          +{getNumbersInFormatOnlyMillions(points)}
        </Typography>
      </Box>

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

const SingleTaskPage = () => {
  const classes = useStyles();

  const topTabs = ["Social", "Referrals"];

  const { viberate } = useTelegramSDK();
  const { gameScore } = useGameHook();
  const score = useSelector((state) => state.ui.score);

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
        <Box style={{ width: "90%", margin: "auto" }}>
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
                "https://cdn3d.iconscout.com/3d/premium/thumb/cash-bonus-on-online-shopping-11964562-9764218.png?f=webp"
              }
              height={"10%"}
              width={"40%"}
              style={{ filter: "drop-shadow(0 -6mm 14mm #BC831E)" }}
            />
            <Typography
              mb={1}
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
              EOT Tasks
            </Typography>
            <TaskRewardComp />
            <Typography
              className={classes.description}
              style={{
                textAlign: "center",
                minHeight: 50,
              }}
            >
              Engage on Ton ($EON) is the first E2E platform. Complete tasks and
              share rewards from 200 $TON Tokens.
            </Typography>
          </Box>

          {tabValue === 0 && (
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
                  gap: "10px",
                  padding: "25px 1%",
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
        </Box>
      </Zoom>
    </Box>
  );
};

export default SingleTaskPage;
