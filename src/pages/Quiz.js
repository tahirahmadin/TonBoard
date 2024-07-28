import * as React from "react";
import { useMemo } from "react";
import { Box, Button, Typography } from "@mui/material";
import useGameHook from "../hooks/useGameHook";
import { useDispatch, useSelector } from "react-redux";
import OptionCard from "../components/OptionCard";
import makeStyles from "@mui/styles/makeStyles";

import ScoreComp from "../components/Score";
import TimerComp from "../components/TimerComp";
import { Link } from "react-router-dom";
import useSlotTimer from "../hooks/useSlotTimer";
import QuizStatsCard from "../components/QuizStatsCard";
import ConfettiExplosion from "react-confetti-explosion";

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

  const currentSlotNo = useSelector((state) => state.ui.currentSlotNo);
  const currentQueNo = useSelector((state) => state.ui.currentQueNo);
  const ansSelected = useSelector((state) => state.ui.ansSelected);
  const timerValue = useSelector((state) => state.ui.timerValue);
  const screenLoaded = useSelector((state) => state.ui.screenLoaded);
  const isQuizPointsClaimed = useSelector(
    (state) => state.ui.isQuizPointsClaimed
  );
  const quizzes = useSelector((state) => state.ui.quizzes);
  const isExploding = useSelector((state) => state.ui.isExploding);

  const { handleClaimButtonClick } = useGameHook();

  const { isTimerRunning } = useSlotTimer(false);

  const questionData = useMemo(() => {
    if (quizzes && quizzes.length === 0) {
      return {};
    }
    return quizzes?.[currentQueNo];
  }, [quizzes, currentQueNo]);

  // useEffect(() => {
  //   if ((currentSlotNo + 1) % (currentSlotNo * 5) === 0) {
  //     dispatch(updateCurrentQueNo(currentQueNo + 1));
  //   }
  // }, [currentSlotNo, currentQueNo, dispatch]);

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

  const showClaimBtn = useMemo(() => {
    if (ansSelected.length === 0 || ansSelected.length < currentQueNo + 1) {
      return false;
    }

    return !isQuizPointsClaimed;
  }, [ansSelected, currentQueNo, isQuizPointsClaimed]);

  return (
    <Box>
      <Box
        style={{ height: "8vh" }}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <QuizStatsCard />
      </Box>
      <Box
        style={{ height: "10vh" }}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <ScoreComp />
      </Box>

      {/* Question */}
      {screenLoaded && questionData && (
        <Box
          style={{
            height: "75vh",
            width: "100%",
            position: "relative",
            zIndex: 0,

            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            backgroundSize: "cover",
            backgroundPosition: "center center",
          }}
        >
          {isExploding && (
            <ConfettiExplosion
              force={0.6}
              duration={2000}
              particleCount={150}
            />
          )}
          {/* Quiz Components */}
          <Box
            pt={2}
            style={{
              height: "63vh",
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
            <a
              href="https://www.youtube.com/@tahirahmad.crypto"
              target="_blank"
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
            </a>
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
                isSelected={isSelected}
                correctOption={questionData?.correct}
                selectedOption={ansSelected[ansSelected.length - 1]}
                inputOption={1}
                title={questionData.option1}
                img="https://cdn3d.iconscout.com/3d/premium/thumb/capital-a-letter-effect-text-9423674-7664624.png"
                description="32,430"
              />
              <OptionCard
                key={2}
                isSelected={isSelected}
                correctOption={questionData.correct}
                selectedOption={ansSelected[ansSelected.length - 1]}
                inputOption={2}
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
              {quizMessageStatus === 1 && "Great! Right answer"}
              {quizMessageStatus === 2 && "Sorry! Try next time!"}
            </Typography>
            <Box>
              {isTimerRunning && (
                <Box height={"10vh"}>
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
            <Box height={"10vh"}>
              {showClaimBtn && (
                <Button
                  onClick={showClaimBtn ? handleClaimButtonClick : null}
                  style={{
                    marginTop: 20,
                    fontWeight: 700,
                    fontSize: "14px",
                    display: "flex",
                    alignItems: "center",
                    textAlign: "center",
                    justifyContent: "center",
                    width: 160,
                    margin: "0 auto",
                    height: "38px",
                    // background: "#64FF99",
                    borderRadius: "12px",
                    border: "1px solid #64FF99",
                    color: "#64FF99",
                  }}
                >
                  <img
                    src="https://cdn3d.iconscout.com/3d/premium/thumb/dollar-sack-9250771-7582870.png?f=webp"
                    style={{ width: 24, height: 24 }}
                    alt=""
                  />
                  Claim Rewards
                </Button>
              )}
            </Box>
          </Box>
          {/* Timer, Claim and Boost Components */}
          <Box
            style={{
              heght: "20vh",
              width: "90%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              pt={2}
              style={{
                width: "90%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src="/images/energy.png"
                  style={{
                    width: 20,
                    height: 20,
                    objectFit: "contain",
                  }}
                />

                <Typography
                  style={{
                    width: "100%",
                    fontWeight: 600,
                    fontSize: 16,
                    color: "#ffffff",
                  }}
                >
                  {displayQuestionNumber}/5
                </Typography>
              </Box>
              <Link to="/boost">
                <Box
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src="https://cdn3d.iconscout.com/3d/premium/thumb/go-green-11413832-9197004.png?f=webp"
                    style={{
                      width: 22,
                      height: 22,
                      objectFit: "contain",
                    }}
                  />

                  <Typography
                    style={{
                      width: "100%",
                      fontWeight: 600,
                      fontSize: 16,
                      color: "#ffffff",
                    }}
                  >
                    Boost
                  </Typography>
                </Box>
              </Link>
            </Box>
          </Box>
        </Box>
      )}

      {!screenLoaded && (
        <Box
          display="flex"
          justifyContent={"center"}
          alignItems={"center"}
          style={{ height: "80vh" }}
        >
          <img
            type="image/svg+xml"
            src="https://cdn3d.iconscout.com/3d/premium/thumb/businesswoman-satisfied-after-investment-growth-6219694-5106203.png"
            height={"200px"}
          />
        </Box>
      )}
    </Box>
  );
};

export default QuizPage;
