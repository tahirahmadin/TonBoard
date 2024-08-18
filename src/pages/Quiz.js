import * as React from "react";
import { useMemo } from "react";
import { Box, Button, Typography } from "@mui/material";
import useGameHook from "../hooks/useGameHook";
import { useDispatch, useSelector } from "react-redux";
import OptionCard from "../components/OptionCard";
import makeStyles from "@mui/styles/makeStyles";
import ScoreComp from "../components/Score";
import TimerComp from "../components/TimerComp";
import useSlotTimer from "../hooks/useSlotTimer";
import ConfettiExplosion from "react-confetti-explosion";
import LoadingScreen from "../components/LoadingScreen";

import ProgressBar from "../components/ProgressBar";

const useStyles = makeStyles((theme) => ({
  description: {
    width: "100%",
    textAlign: "center",
    fontSize: 16,
    lineHeight: "120%",
    color: "rgba(253, 255, 245, 0.8)",
    position: "relative",
    zIndex: 1,
  },
}));
const QuizPage = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const quizzes = useSelector((state) => state.ui.quizzes);
  const currentSlotNo = useSelector((state) => state.ui.currentSlotNo);
  const currentQueNo = useSelector((state) => state.ui.currentQueNo);
  const ansSelected = useSelector((state) => state.ui.ansSelected);

  const timerValue = useSelector((state) => state.ui.timerValue);
  const screenLoaded = useSelector((state) => state.ui.screenLoaded);

  const isExploding = useSelector((state) => state.ui.isExploding);
  const isNextButtonEnabled = useSelector(
    (state) => state.ui.isNextButtonEnabled
  );
  const isQuizLoading = useSelector((state) => state.ui.isQuizLoading);

  const { handleNextButtonClick } = useGameHook();

  const { isTimerRunning } = useSlotTimer(false);

  const questionData = useMemo(() => {
    if (quizzes && quizzes.length === 0) {
      return {};
    }
    return quizzes?.[currentQueNo];
  }, [quizzes, currentQueNo]);

  const quizMessageStatus = React.useMemo(() => {
    const currOptionIndex = 5 * currentSlotNo + currentQueNo;
    if (ansSelected[currOptionIndex] === undefined) {
      return 0;
    }

    return ansSelected[currOptionIndex] === questionData.correct ? 1 : 2;
  }, [currentQueNo, ansSelected, questionData, currentSlotNo]);

  const isSelected = useMemo(() => {
    return ansSelected.length === currentSlotNo * 5 + currentQueNo + 1;
  }, [ansSelected, currentQueNo, currentSlotNo]);

  // display current available questions based on slot
  const displayQuestionNumber = useMemo(() => {
    if (currentQueNo % 5 === 0) {
      return 5;
    }

    return 5 - (currentQueNo % 5);
  }, [currentQueNo]);

  const showNextBtn = useMemo(() => {
    if (ansSelected.length === 0 || ansSelected.length < currentQueNo + 1) {
      return false;
    }

    return true;
  }, [ansSelected, currentQueNo]);

  return (
    <Box style={{ backgroundColor: "black" }}>
      {screenLoaded && (
        <Box>
          <Box
            style={{ height: "14vh" }}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <ScoreComp />
          </Box>
          {questionData && (
            <Box
              style={{
                height: "85vh",
                width: "100%",
                position: "relative",
                zIndex: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                alignItems: "center",
                backgroundSize: "cover",
                backgroundPosition: "center center",
              }}
            >
              {isExploding && (
                <ConfettiExplosion
                  force={0.3}
                  duration={2000}
                  particleCount={80}
                />
              )}
              {/* Quiz Components */}
              <Box
                style={{
                  height: "60vh",
                  width: "90%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <Box
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-center",
                    alignItems: "center",
                    backgroundColor: "#212121",
                    borderRadius: 7,
                    paddingRight: 12,
                    paddingLeft: 12,
                    paddingTop: 5,
                    paddingBottom: 5,
                  }}
                >
                  <img
                    src={
                      "https://cdn3d.iconscout.com/3d/premium/thumb/categoria-7844691-6244113.png?f=webp"
                    }
                    alt="TaskDao"
                    width={16}
                    height={16}
                  />
                  <Box
                    style={{
                      width: "100%",
                      fontFamily: "Rubik",
                      fontWeight: 400,
                      fontSize: 12,
                      lineHeight: "100%",
                      textAlign: "center",
                      color: "#e5e5e5",
                    }}
                  >
                    {questionData?.category}
                  </Box>
                </Box>
                <Typography
                  style={{
                    fontFamily: "Rubik",
                    fontWeight: 600,
                    fontSize: 22,
                    lineHeight: "120%",
                    textAlign: "center",
                    color: "#ffffff",
                  }}
                >
                  {questionData?.title}
                </Typography>
                {/* <a
                  href="https://www.youtube.com/@tahirahmad.crypto"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Typography
                    style={{
                      fontFamily: "Rubik",
                      fontWeight: 400,
                      fontSize: 12,
                      lineHeight: "120%",
                      textAlign: "center",
                      color: "#64b5f6",
                      marginTop: 10,
                    }}
                  >
                    <img
                      src="https://cdn-icons-png.freepik.com/512/3845/3845829.png"
                      style={{
                        width: 14,
                        height: 14,
                        objectFit: "contain",
                        marginRight: 3,
                      }}
                    />
                    Hint : Learn here
                  </Typography>
                </a> */}
                <Box
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-around",
                    marginTop: 14,
                  }}
                >
                  <OptionCard
                    key={1}
                    inputOption={1}
                    disable={isQuizLoading}
                    isSelected={isSelected}
                    title={questionData.option1}
                    img="https://cdn3d.iconscout.com/3d/premium/thumb/capital-a-letter-effect-text-9423674-7664624.png"
                    description="32,430"
                  />
                  <OptionCard
                    key={2}
                    inputOption={2}
                    disable={isQuizLoading}
                    isSelected={isSelected}
                    title={questionData.option2}
                    img="https://cdn3d.iconscout.com/3d/premium/thumb/capital-b-letter-effect-text-9423689-7664639.png"
                    description="1,203"
                  />
                </Box>
                <Typography
                  pt={1}
                  style={{
                    width: "100%",
                    fontWeight: 600,
                    fontSize: 16,
                    color: quizMessageStatus === 1 ? "#64FF99" : "#ef5350",
                    textAlign: "center",
                  }}
                >
                  {quizMessageStatus === 1 && "Great! Right answer."}
                  {quizMessageStatus === 2 && "Sorry! Try next time!"}
                </Typography>
                <Box>
                  {isTimerRunning && (
                    <Box height={"12vh"}>
                      <Typography
                        style={{
                          textAlign: "center",
                          color: "#e5e5e5",
                        }}
                      >
                        Next slot in
                      </Typography>
                      <TimerComp endTime={timerValue} />
                    </Box>
                  )}
                </Box>
              </Box>
              {/* Timer, Claim and Boost Components */}
              <Box
                height={"25vh"}
                width="80%"
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"flex-start"}
              >
                <Box minHeight={"6vh"}>
                  {isNextButtonEnabled && (
                    <Button
                      onClick={
                        isNextButtonEnabled ? handleNextButtonClick : null
                      }
                      style={{
                        fontWeight: 700,
                        fontSize: "14px",
                        display: "flex",
                        alignItems: "center",
                        textAlign: "center",
                        justifyContent: "center",
                        width: 160,
                        margin: "0 auto",
                        height: "38px",
                        borderRadius: "12px",
                        color: "#93ddff",
                      }}
                    >
                      {isQuizLoading ? "Wait..." : "Next Question >>"}
                    </Button>
                  )}
                </Box>

                <Box
                  mt={2}
                  style={{
                    width: "100%",
                    minHeight: "50.86px",
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
                      textAlign: "center",
                      color: "#ffffff",
                    }}
                  >
                    Quiz Progress ({5 - displayQuestionNumber}/5)
                  </Typography>
                  <ProgressBar
                    value={((5 - displayQuestionNumber) * 100) / 5}
                  />
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      )}

      {!screenLoaded && <LoadingScreen text={"Onboarding the World to TON"} />}
    </Box>
  );
};

export default QuizPage;
