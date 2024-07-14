import React, { useEffect, useMemo, useState } from "react";
import Profile from "../components/Profile";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import { CheckCircle, KeyboardArrowRight } from "@mui/icons-material";
import { useTheme } from "@mui/styles";
import { useServerAuth } from "../hooks/useServerAuth";
import { getTasksData, updateTaskStatusAPI } from "../actions/serverActions";
import useTelegramSDK from "../hooks/useTelegramSDK";
import { LEAGUE_LEVEL_DATA, REFERRAL_COUNT_DATA } from "../utils/constants";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useGameHook from "../hooks/useGameHook";
import SuccessSnackbar from "../components/SuccessSnackbar";
import { setSuccessPopup } from "../reducers/UiReducers";
import ProgressBar from "../components/ProgressBar";

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
        minWidth: 65,
        maxWidth: 65,
        height: 28,
        display: "flex",
        alignItems: "center",
        paddingRight: "6px",
        textTransform: "capitalize",
        opacity: !disabled ? 1 : 0.6,
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
  name,
  url,
  taskStatus,
  taskNumber,
  currentTabValue,
  action,
  points,
  pointsText,
  refetch,
  setRefetch,
  background,
}) => {
  const dispatch = useDispatch();
  const { openTelegramUrl } = useTelegramSDK();
  const { accountSC } = useServerAuth();
  const { claimTaskPoints } = useGameHook();

  // OPEN URL - STATUS= Started
  const onClickAction = async () => {
    if (taskStatus === 0) {
      await openTelegramUrl(url);
      // Update status to progress
      let res = await updateTaskStatusAPI(accountSC, taskNumber, 1);
      if (res) {
        setRefetch(refetch + 1);
      }
    }
  };

  // CLAIM REWARDS
  const onClickClaim = async () => {
    // // Update status to progress
    await claimTaskPoints(points);
    let res = await updateTaskStatusAPI(accountSC, taskNumber, 2);
    if (res) {
      await dispatch(setSuccessPopup(true));
      setRefetch(refetch + 1);
    }
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
          width: "83px",
          height: "22px",
          background: "#FAFF00",
          borderRadius: "8px",

          fontWeight: 500,
          fontSize: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "#000000",
          position: "absolute",
          bottom: -11,
        }}
      >
        +{pointsText} Points
      </Typography>

      {currentTabValue === 0 && taskStatus === 0 && (
        <ActionButton onClick={onClickAction}>Start</ActionButton>
      )}
      {currentTabValue === 0 && taskStatus === 1 && (
        <ActionButton
          onClick={taskStatus === 0 ? null : onClickClaim}
          disabled={taskStatus === 0}
        >
          Claim
        </ActionButton>
      )}
      {taskStatus === 2 && <ActionButton disabled={true}>Claimed</ActionButton>}
    </Box>
  );
};

const SingleNonSpecialTask = ({
  name,
  index,
  taskNumber,
  points,
  pointsText,
  isClaimable,
  isClaimed,
  refetch,
  setRefetch,
  currentTabValue,
  totalReferrals,
}) => {
  const dispatch = useDispatch();
  const { claimLeagueLevel, claimReferralLevel } = useGameHook();
  const { accountSC } = useServerAuth();
  const tapScore = useSelector((state) => state.ui.tapScore);
  const leagueLevel = useSelector((state) => state.ui.leagueLevel);

  // Claim Rewards
  const onClickClaim = async () => {
    // Update status to progress
    let totalLevels = LEAGUE_LEVEL_DATA.length;
    if (
      currentTabValue === 1 &&
      tapScore > points &&
      leagueLevel < totalLevels
    ) {
      await claimLeagueLevel(index);
      let res = await updateTaskStatusAPI(accountSC, taskNumber, 2);
      if (res) {
        dispatch(setSuccessPopup(true));
        setRefetch(refetch + 1);
      }
    }
    if (currentTabValue === 2) {
      await claimReferralLevel(index);
      let res = await updateTaskStatusAPI(accountSC, taskNumber, 2);
      if (res) {
        dispatch(setSuccessPopup(true));
        setRefetch(refetch + 1);
      }
    }
  };

  return (
    <Box
      style={{
        width: "100%",
        minHeight: "55.86px",
        background: "linear-gradient(271.2deg, #FA2F83 0.64%, #FB58CD 100%)",
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
          width: "83px",
          height: "22px",
          background: "#FAFF00",
          borderRadius: "8px",

          fontWeight: 500,
          fontSize: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "#000000",
          position: "absolute",
          bottom: -11,
        }}
      >
        +{pointsText} Points
      </Typography>
      {isClaimed && <ActionButton disabled={true}>Claimed</ActionButton>}
      {!isClaimed && (
        <ActionButton
          onClick={!isClaimable ? null : onClickClaim}
          disabled={!isClaimable}
        >
          Claim
        </ActionButton>
      )}
    </Box>
  );
};
const Tasks = () => {
  const { viberate } = useTelegramSDK();
  const { accountSC } = useServerAuth();
  const score = useSelector((state) => state.ui.score);
  const tapScore = useSelector((state) => state.ui.tapScore);
  const leagueLevel = useSelector((state) => state.ui.leagueLevel);

  const [tabValue, setTabValue] = useState(0);
  const [taskStart, setTaskStart] = useState(false);

  //Tasks states
  const [allTasks, setAllTasks] = useState(null);
  const [playerData, setPlayerData] = useState(null);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [refetch, setRefetch] = useState(0);

  const categoryNames = ["SPECIAL", "LEAGUE", "REFERRAL"];

  // API call: to fetch tasks
  useEffect(() => {
    async function asyncFn() {
      if (accountSC) {
        let res = await getTasksData(accountSC);
        console.log(res);
        if (res && res.finalTasks) {
          setAllTasks(res.finalTasks);
        }
        if (res && res.DATA) {
          setPlayerData(res.DATA);
        }
        setPageLoaded(true);
      }
    }

    asyncFn();
  }, [accountSC, refetch]);

  // Get special tasks by tab
  const specialTasks = useMemo(() => {
    if (!allTasks) {
      return [];
    }
    return allTasks.filter((ele) => ele.type === categoryNames[0]);
  }, [allTasks]);

  // Get league tasks by tab
  const nonSpecialTasks = useMemo(() => {
    if (!allTasks) {
      return [];
    }
    return allTasks.filter((ele) => ele.type === categoryNames[tabValue]);
  }, [tabValue, allTasks]);

  return (
    <Box
      style={{
        width: "100%",
        minHeight: "calc(100vh - 60px)",
        position: "relative",
        background: "#161811",
        paddingTop: "25px",
        zIndex: 0,
        paddingTop: 25,
        paddingLeft: "1%",
        paddingRight: "1%",
      }}
    >
      {pageLoaded && (
        <Box>
          <SuccessSnackbar text="Reward claimed succesfully!" />

          <Profile />
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
            <Box
              display={"flex"}
              flexDirection="column"
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Typography
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  fontFamily: "Rubik",
                  fontWeight: 800,
                  fontSize: 14,
                  lineHeight: "100%",
                  textAlign: "center",
                  color: "#64FF99",
                }}
              >
                Current Points
              </Typography>
              <Typography
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
                {score.toLocaleString()}
              </Typography>
            </Box>

            <Link to="/league">
              <Typography
                style={{
                  minWidth: 125,
                  height: 21,
                  background: "orange",

                  fontWeight: 700,
                  fontSize: "14px",
                  lineHeight: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  color: "#000000",
                  padding: "0 5px 0 0",
                  borderRadius: "8px",
                  whiteSpace: "nowrap",
                }}
              >
                <img
                  src={LEAGUE_LEVEL_DATA[playerData.leagueLevel].img}
                  style={{
                    width: 28,
                    height: 25,
                    objectFit: "contain",
                  }}
                />
                {LEAGUE_LEVEL_DATA[leagueLevel].title}
                <KeyboardArrowRight style={{ color: "#fff" }} />
              </Typography>
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
                {specialTasks.map((ele, i) => (
                  <SingleTask
                    key={i}
                    taskNumber={ele.taskNumber}
                    name={ele.title}
                    url={ele.url}
                    points={ele.points}
                    pointsText={ele.pointsText}
                    taskStatus={ele.status}
                    refetch={refetch}
                    setRefetch={setRefetch}
                    currentTabValue={tabValue}
                  />
                ))}
                {specialTasks.length === 0 && (
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
                }}
              >
                {tabValue === 1 &&
                  nonSpecialTasks.map((ele, i) => (
                    <SingleNonSpecialTask
                      key={i}
                      index={i}
                      taskNumber={ele.taskNumber}
                      name={ele.title}
                      pointsText={ele.pointsText}
                      points={ele.points}
                      isClaimable={tapScore > ele.points}
                      isClaimed={ele.status === 2}
                      refetch={refetch}
                      setRefetch={setRefetch}
                      currentTabValue={tabValue}
                      totalReferrals={playerData.totalReferrals}
                    />
                  ))}
                {tabValue === 2 &&
                  nonSpecialTasks.map((ele, i) => (
                    <SingleNonSpecialTask
                      key={i}
                      taskNumber={ele.taskNumber}
                      name={ele.title}
                      points={ele.points}
                      pointsText={ele.pointsText}
                      isClaimable={
                        playerData.totalReferrals >= REFERRAL_COUNT_DATA[i]
                      }
                      isClaimed={ele.status === 2}
                      refetch={refetch}
                      setRefetch={setRefetch}
                      currentTabValue={tabValue}
                      totalReferrals={playerData.totalReferrals}
                    />
                  ))}

                {nonSpecialTasks.length === 0 && (
                  <Box style={{ textAlign: "center" }}>No tasks found</Box>
                )}
              </Box>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default Tasks;
