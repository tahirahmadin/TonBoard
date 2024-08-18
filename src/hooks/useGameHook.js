import { useEffect, useMemo } from "react";

import { LEAGUE_TASKS_DATA } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  setSuccessPopup,
  updateLeagueLevel,
  updateScore,
  updateCurrentQueNo,
  updateTimerValue,
  updateQuizPointClaimStatus,
  updaQuizLoadingStatus,
  getBackendDataToRedux,
} from "../reducers/UiReducers";
import useTelegramSDK from "./useTelegramSDK";
import { updateDataToBackendAPI } from "../actions/serverActions";
import { useServerAuth } from "./useServerAuth";

// delay for next quiz slot
const NEXT_SLOT_TIME = 60 * 1000; //21600000;

const useGameHook = (hookInit = false) => {
  const dispatch = useDispatch();

  const { accountSC } = useServerAuth();
  const { viberate } = useTelegramSDK();

  const score = useSelector((state) => state.ui.score);

  const currentQueNo = useSelector((state) => state.ui.currentQueNo);
  const currentSlotNo = useSelector((state) => state.ui.currentSlotNo);
  const ansSelected = useSelector((state) => state.ui.ansSelected);
  const playLevels = useSelector((state) => state.ui.playLevels);
  const referralPoints = useSelector((state) => state.ui.referralPoints);
  const userId = useSelector((state) => state.ui.userId);
  const timerValue = useSelector((state) => state.ui.timerValue);
  const quizzes = useSelector((state) => state.ui.quizzes);

  //1.  To Manage initial loading of the application
  useEffect(() => {
    async function asyncFn() {
      if (hookInit && accountSC) {
        // //1.  Load Backend
        await dispatch(getBackendDataToRedux(accountSC));
      }
    }

    asyncFn();
  }, [accountSC, hookInit]);

  // 2. Final Score = score + referral score
  const finalScore = useMemo(() => {
    return score + referralPoints;
  }, [score, referralPoints]);

  // 3. Get Current Question data
  const questionData = useMemo(() => {
    if (quizzes && quizzes.length === 0) {
      return {};
    }
    return quizzes?.[currentQueNo];
  }, [quizzes, currentQueNo]);

  const _handleNextButtonClick = async () => {
    let rewardsOnCorrect = _pointsOnCorrectAnswer;
    let rewardsOnWrong = _pointsOnWrongAnswer;

    // update score
    let scoreUpdate = score;
    let timerUpdate = timerValue;
    let questionNumberUpdate = currentQueNo;

    if (ansSelected.length !== 0) {
      let inputOption = ansSelected[ansSelected.length - 1];
      //Update user score
      if (questionData.correct === inputOption) {
        // update points on correct
        scoreUpdate = score + rewardsOnCorrect;
      } else {
        // update points on wrong
        scoreUpdate = score + rewardsOnWrong;
      }

      if (ansSelected.length % 5 === 0) {
        let nextTimerValue = Date.now() + NEXT_SLOT_TIME;
        timerUpdate = nextTimerValue;
      }
    }

    // move to next question if current slot has more otherwise show timer for next slot
    if (ansSelected.length % 5 > 0) {
      questionNumberUpdate = (currentQueNo + 1) % 5;
    }

    if (scoreUpdate < score) {
      console.log("invalid score update");
      return;
    }

    dispatch(updaQuizLoadingStatus(true));
    const res = await updateDataToBackendAPI({
      userId,
      currentQueNo: questionNumberUpdate,
      timerValue: timerUpdate,
      isQuizPointsClaimed: true,
      score: scoreUpdate,
    });
    dispatch(updaQuizLoadingStatus(false));

    if (!res) {
      //: Tahir handle display error on UI

      alert("Failed to make api call");
      return;
    }
    if (questionNumberUpdate !== null) {
      dispatch(updateCurrentQueNo(questionNumberUpdate));
    }

    if (timerUpdate !== null) {
      dispatch(updateTimerValue(timerUpdate));
    }
    dispatch(updateScore(scoreUpdate));

    dispatch(updateQuizPointClaimStatus(true));

    viberate("medium");
  };

  // FUNCTION:: Claim Points
  const _claimTaskPoints = async (inputPoints) => {
    await dispatch(updateScore(score + inputPoints));
    viberate("light");
    dispatch(setSuccessPopup(true));
  };
  // FUNCTION:: Claim League level
  const _claimLeague = async (inputLevel) => {
    let pointsToAdd = LEAGUE_TASKS_DATA[inputLevel].points;
    await dispatch(updateScore(score + pointsToAdd));
    await dispatch(updateLeagueLevel(inputLevel));
    dispatch(setSuccessPopup(true));
  };

  // FUNCTION:: Referral level
  const _claimReferralLevel = async (inputPoints) => {
    console.log(inputPoints);
    await dispatch(updateScore(score + inputPoints));
    dispatch(setSuccessPopup(true));
  };

  const _pointsOnCorrectAnswer = 1000;

  const _pointsOnWrongAnswer = 250;

  const _timerDuration = 60;

  return {
    gameScore: finalScore,
    pointsOnCorrectAnswer: _pointsOnCorrectAnswer,
    pointsOnWrongAnswer: _pointsOnWrongAnswer,
    timerDuration: _timerDuration,
    handleNextButtonClick: _handleNextButtonClick,
    claimTaskPoints: _claimTaskPoints,
    claimLeagueLevel: _claimLeague,
    claimReferralLevel: _claimReferralLevel,
  };
};

export default useGameHook;
