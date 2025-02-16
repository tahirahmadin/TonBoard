import * as React from "react";
import { useMemo } from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import OptionCard from "../components/OptionCard";
import makeStyles from "@mui/styles/makeStyles";
import ScoreComp from "../components/Score";
import useSlotTimer from "../hooks/useSlotTimer";
import ConfettiExplosion from "react-confetti-explosion";
import LoadingScreen from "../components/LoadingScreen";
import ProgressBar from "../components/ProgressBar";
import { useServerAuth } from "../hooks/useServerAuth";
import { getQuizData, markQuizAnswer } from "../actions/serverActions";
import { updateOnQuizResult, updateQuestion } from "../reducers/UiReducers";
import useTelegramSDK from "../hooks/useTelegramSDK";
import { CATEGORY_DATA } from "../utils/constants";
import SummaryCard from "../components/SummaryCard";

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

  const screenLoaded = useSelector((state) => state.ui.screenLoaded);

  const questionData = useSelector((state) => state.ui.questionData);

  const isQuizLoading = useSelector((state) => state.ui.isQuizLoading);

  const { accountSC } = useServerAuth();
  const { viberate } = useTelegramSDK();

  const { isTimerRunning } = useSlotTimer(true);

  console.log("question test ", { isTimerRunning });

  const question = useMemo(() => {
    if (!questionData.question) {
      return {};
    }
    return questionData.question;
  }, [questionData]);

  const [selectedOption, setSelectedOption] = React.useState(null);

  const [loadingResult, setLoadingResult] = React.useState(false);
  const [loadingNext, setLoadingNext] = React.useState(false);
  const [isExploding, setIsExploding] = React.useState(false);
  const [reward, setReward] = React.useState(0);

  const handleOptionSelect = React.useCallback(
    async (option) => {
      viberate("medium");
      if (
        selectedOption !== null ||
        isTimerRunning ||
        loadingResult ||
        loadingNext
      ) {
        return;
      }

      let dataObj = {
        userId: accountSC,
        slotNo: currentSlotNo,
        questionNo: currentQueNo,
        selectedOption: option,
        currentTimestamp: Date.now(),
      };
      setLoadingResult(true);
      const response = await markQuizAnswer(dataObj);

      if (!response.error) {
        if (response.isCorrect) {
          viberate("heavy");
        } else {
          viberate("medium");
        }
        setReward(response.result?.reward);
      }
      setLoadingResult(false);
      dispatch(updateOnQuizResult(response));
      setSelectedOption(option);
    },
    [
      selectedOption,
      accountSC,
      currentSlotNo,
      currentQueNo,
      dispatch,
      isTimerRunning,
      loadingNext,
      loadingResult,
    ]
  );

  const isCorrect = useMemo(() => {
    if (!question.correct) {
      return false;
    }

    return question.correct === selectedOption;
  }, [question, selectedOption]);

  React.useEffect(() => {
    if (selectedOption && isCorrect) {
      setIsExploding(true);

      setTimeout(() => {
        setIsExploding(false);
      }, 2000);
    }
  }, [isCorrect, selectedOption]);

  const handleNext = React.useCallback(async () => {
    // check if timer is running

    setLoadingNext(true);
    setSelectedOption(null);
    let response = await getQuizData(accountSC);
    setLoadingNext(false);

    dispatch(updateQuestion(response));

    // setSelectedOption(null);
    // handleNextButtonClick();
  }, [accountSC, dispatch]);

  return (
    <Box style={{ backgroundColor: "black" }}>
      {screenLoaded && (
        <Box>
          <Box
            style={{ height: "18vh" }}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <ScoreComp />
            <Typography
              style={{
                width: "100%",
                fontFamily: "Rubik",
                fontWeight: 400,
                fontSize: 13,
                lineHeight: "110%",
                textAlign: "center",
                color: "#ffffff",
              }}
            >
              Total Diamonds
            </Typography>
          </Box>
          <Box
            style={{
              height: "80vh",
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
              {/* Question component */}
              {question && !isTimerRunning && (
                <Box
                  style={{
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
                      src={CATEGORY_DATA[question?.category]}
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
                      {question?.category}
                    </Box>
                  </Box>
                  <Typography
                    mt={1}
                    style={{
                      fontFamily: "Rubik",
                      fontWeight: 600,
                      fontSize: 22,
                      lineHeight: "120%",
                      textAlign: "center",
                      color: "#ffffff",
                    }}
                  >
                    {question?.title}
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
                      disable={isQuizLoading || selectedOption > 0}
                      isSelected={selectedOption === 1}
                      rewardPoints={reward}
                      inputOption={1}
                      title={question.option1}
                      img="a.webp"
                      description="32,430"
                      handleSelect={handleOptionSelect}
                      isCorrect={isCorrect}
                    />
                    <OptionCard
                      key={2}
                      disable={isQuizLoading || selectedOption > 0}
                      isSelected={selectedOption === 2}
                      isCorrect={isCorrect}
                      rewardPoints={reward}
                      inputOption={2}
                      handleSelect={handleOptionSelect}
                      title={question.option2}
                      img="b.webp"
                      description="1,203"
                    />
                  </Box>

                  <Typography
                    pt={1}
                    style={{
                      width: "100%",
                      fontWeight: 600,
                      fontSize: 16,
                      color: isCorrect ? "#64FF99" : "#ef5350",
                      textAlign: "center",
                    }}
                  >
                    {selectedOption && isCorrect && "Great! Right answer."}
                    {selectedOption && !isCorrect && "Sorry! Try next time!"}
                  </Typography>
                  {!selectedOption && (
                    <Box
                      mt={1}
                      display={"flex"}
                      flexDirection="row"
                      justifyContent={"center"}
                      alignItems={"center"}
                      style={{
                        width: "100%",
                        fontFamily: "Rubik",
                        fontWeight: 400,
                        fontSize: 13,
                        lineHeight: "110%",
                        textAlign: "center",
                        color: "#ffffff",
                      }}
                    >
                      {" "}
                      <div>Each correct answer = </div>
                      <img
                        src={"images/navbar/invite.webp"}
                        alt="invite"
                        width={18}
                        height={19}
                      />
                      <div>{10 * currentSlotNo + 10} </div>
                    </Box>
                  )}
                </Box>
              )}

              {isTimerRunning && (
                <Box>
                  <SummaryCard />
                </Box>
              )}
            </Box>

            {/* Timer, Claim and Boost Components */}

            <Box height={"25vh"} width="80%">
              <Box height={"5vh"} display={"flex"} justifyContent={"center"}>
                {selectedOption && (
                  <Button
                    onClick={handleNext}
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
                    Next Question
                  </Button>
                )}
                {(loadingNext || loadingResult) && (
                  <div>
                    <CircularProgress variant="indeterminate" size={18} />
                  </div>
                )}
              </Box>

              <Box>
                {!isTimerRunning && (
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
                      Quiz Progress ({questionData?.summary?.attempted}/5)
                    </Typography>
                    <ProgressBar
                      value={(questionData?.summary?.attempted * 100) / 5}
                    />
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      )}

      {!screenLoaded && <LoadingScreen text={"Onboarding the World to TON"} />}
    </Box>
  );
};

export default QuizPage;
