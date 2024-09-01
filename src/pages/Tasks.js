import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Grow,
  Typography,
  useMediaQuery,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { useTheme } from "@mui/styles";
import { useServerAuth } from "../hooks/useServerAuth";
import useTelegramSDK from "../hooks/useTelegramSDK";
import { useDispatch, useSelector } from "react-redux";
import SuccessSnackbar from "../components/SuccessSnackbar";
import {
  getBackendDataToRedux,
  updateTaskCompleteStatus,
} from "../reducers/UiReducers";
import { useParams } from "react-router-dom";
import { getNumbersInFormatOnlyMillions } from "../actions/helperFn";
import SmallProgressBar from "../components/SmallProgressBar";
import { TASKS_DATA } from "../utils/constants";

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

  style,

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
          borderRadius: "8px",
          fontWeight: 700,
          fontSize: 12,
          color: "#ffffff",
          whiteSpace: "nowrap",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0088cc",
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
  workId,
  allTasksStatus,
  name,
  url,
  inProgress,
  setInProgress,
}) => {
  const dispatch = useDispatch();
  const { openTelegramUrl } = useTelegramSDK();
  const { accountSC } = useServerAuth();

  // OPEN URL - STATUS= Completed
  const onClickAction = async () => {
    if (!isCompleted && inProgress === -1) {
      setInProgress(taskId);
      await openTelegramUrl(url);
      // Update status to progress
      let dataObj = {
        userId: accountSC,
        workId: workId,
        taskId: taskId,
      };
      await dispatch(updateTaskCompleteStatus(dataObj));
      setTimeout(() => {
        dispatch(getBackendDataToRedux(accountSC));
      }, 9000);
      setTimeout(() => {
        setInProgress(-1);
      }, 10000);
    }
  };

  const isCompleted = useMemo(() => {
    if (allTasksStatus) {
      let tempIndex = allTasksStatus.findIndex((ele) => ele === taskId);

      if (tempIndex < 0) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }, [allTasksStatus]);

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
            fontSize: 16,
            lineHeight: "21px",
            color: "#ffffff",
          }}
        >
          {name}
        </Typography>
      </Box>

      {!isCompleted && inProgress !== taskId && (
        <ActionButton onClick={() => onClickAction(taskId)}>Open</ActionButton>
      )}

      {!isCompleted && inProgress === taskId && (
        <Box display={"flex"} justifyContent={"flex-start"}>
          <CircularProgress size={20} thickness={5} />
        </Box>
      )}

      {isCompleted && (
        <img
          src="https://cdn3d.iconscout.com/3d/premium/thumb/successfully-done-5108472-4288033.png"
          style={{
            width: 28,
            height: 28,
            objectFit: "contain",
          }}
        />
      )}
    </Box>
  );
};

const Tasks = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { viberate } = useTelegramSDK();
  const { projectId } = useParams();

  const screenLoaded = useSelector((state) => state.ui.screenLoaded);
  const projects = useSelector((state) => state.ui.projects);
  const workCompleted = useSelector((state) => state.ui.workCompleted);

  //Tasks states
  const [inProgress, setInProgress] = useState(-1);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [projectDetails, setProjectDetails] = useState(null);
  const [allTasks, setAllTasks] = useState([]);
  const [allTasksStatus, setAllTasksStatus] = useState([]);

  useEffect(() => {
    if (screenLoaded && projectId && projects?.length > projectId) {
      setProjectDetails(projects[projectId]);
      setAllTasks(projects[projectId].tasks);
      setPageLoaded(true);
    }
  }, [projectId, screenLoaded, workCompleted, projects]);

  useEffect(() => {
    if (screenLoaded && projectId && workCompleted?.length > projectId) {
      setAllTasksStatus(workCompleted[projectId]);
    }
  }, [projectId, screenLoaded, workCompleted]);

  const completedTasksPercentage = useMemo(() => {
    if (projects.length > 0 && allTasksStatus && allTasks.length > 0) {
      return (100 * allTasksStatus.length) / allTasks.length;
    } else {
      return 0;
    }
  }, [allTasks, allTasksStatus, projects]);

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
      {console.log(allTasksStatus)}
      <Grow direction="down" in={true}>
        <Box style={{ width: "100%", margin: "auto" }}>
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
            <img
              src={"images/navbar/tasks.webp"}
              width={108}
              height={108}
              style={{
                filter: "drop-shadow(0 -6mm 14mm #757575)",
                borderRadius: "50%",
              }}
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
              TonBoard Tasks
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
              TonBoard ($TBD) is the first user onboarding platform on TON.
              Complete tasks and share rewards from 200 $TON Tokens.
            </Typography>
          </Box>
          <Box
            mt={2}
            style={{
              width: "100%",
              minHeight: "50.86px",
              background:
                "linear-gradient(241.27deg, rgba(253, 255, 245, 0.08) -5.59%, rgba(253, 255, 245, 0) 100%)",
              borderRadius: "12px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "8px 15px",
            }}
          >
            <Typography
              style={{
                width: "100%",
                fontFamily: "Rubik",
                fontWeight: 400,
                fontSize: 14,
                lineHeight: "150%",
                textAlign: "left",
                color: "#ffffff",
              }}
            >
              Airdrop Progress ({allTasksStatus.length}/{allTasks.length})
            </Typography>
            <SmallProgressBar value={completedTasksPercentage} />
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
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                gap: "10px",
                padding: "25px 1%",
                overflowY: "auto",
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
                Tasks
              </Typography>
              {TASKS_DATA.map((ele, i) => (
                <SingleTask
                  key={i}
                  workId={parseInt(projectId)}
                  allTasksStatus={allTasksStatus}
                  taskId={ele.id}
                  name={ele.title}
                  url={ele.taskUrl}
                  inProgress={inProgress}
                  setInProgress={setInProgress}
                />
              ))}
            </Box>
          </Box>
        </Box>
      </Grow>
    </Box>
  );
};

export default Tasks;
