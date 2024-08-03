import { useCallback, useMemo, useState } from "react";

import { LEAGUE_TASKS_DATA } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  setSuccessPopup,
  updateLeagueLevel,
  updatePlayLevels,
  updateScore,
  updateAnsSelected,
  updateCurrentQueNo,
  updateTimerValue,
  updateQuizPointClaimStatus,
  updateIsExploding,
  updaQuizLoadingStatus,
} from "../reducers/UiReducers";
import useTelegramSDK from "./useTelegramSDK";
import { updateDataToBackendAPI } from "../actions/serverActions";

// delay for next quiz slot
const NEXT_SLOT_TIME = 60 * 1000; //21600000;

const useGameHook = (hookInit = false) => {
  const dispatch = useDispatch();
  const score = useSelector((state) => state.ui.score);
  const currentQueNo = useSelector((state) => state.ui.currentQueNo);
  const currentSlotNo = useSelector((state) => state.ui.currentSlotNo);
  const ansSelected = useSelector((state) => state.ui.ansSelected);
  const playLevels = useSelector((state) => state.ui.playLevels);
  const referralPoints = useSelector((state) => state.ui.referralPoints);
  const userId = useSelector((state) => state.ui.userId);
  const timerValue = useSelector((state) => state.ui.timerValue);

  const quizzes = useSelector((state) => state.ui.quizzes);

  const questionData = useMemo(() => {
    if (quizzes && quizzes.length === 0) {
      return {};
    }
    return quizzes?.[currentQueNo];
  }, [quizzes, currentQueNo]);

  const { viberate } = useTelegramSDK();

  // Final Score = score + referral score
  const finalScore = useMemo(() => {
    return score + referralPoints;
  }, [score, referralPoints]);

  // FUNCTION:: Handle select question
  const _handleAnswerSelected = useCallback(
    async (inputOption) => {
      if (ansSelected.length === currentSlotNo * 5 + currentQueNo + 1) {
        return;
      }

      if (!inputOption) {
        return;
      }

      //Update answers array
      let updatesAnswers = [...ansSelected];
      updatesAnswers.push(inputOption);
      // make api call to update ans selected

      dispatch(updaQuizLoadingStatus(true));
      const res = await updateDataToBackendAPI({
        userId: userId,
        ansSelected: updatesAnswers,
        isQuizPointsClaimed: false,
      });
      dispatch(updaQuizLoadingStatus(false));

      if (!res) {
        //todo: Tahir Display API call failure error in UI
        alert("Failed to make api call");
        return;
      }

      dispatch(updateAnsSelected(updatesAnswers));

      // reset claim status on new ans selection
      dispatch(updateQuizPointClaimStatus(false));

      // Confetti Animation

      if (quizzes[currentQueNo].correct === inputOption) {
        dispatch(updateIsExploding(true));
        setTimeout(() => {
          dispatch(updateIsExploding(false));
        }, 2000);
      }
    },
    [ansSelected, currentQueNo, currentSlotNo, quizzes, dispatch, userId]
  );

  const _handleClaimButtonClick = async () => {
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

  // FUNCTION:: Handle upgrade booster
  const _upgradeBoosterLevel = async (boosterName, coins) => {
    console.log({ boosterName, coins });

    let timerUpdate = playLevels.timer;
    let rewardsUpdate = playLevels.rewards;
    let scoreUpdate = score;

    if (boosterName === "TIMER") {
      scoreUpdate = score - coins;
      timerUpdate = playLevels.timer + 1;
    } else if (boosterName === "REWARDS") {
      scoreUpdate = score - coins;
      rewardsUpdate = playLevels.rewards + 1;
    }

    dispatch(updaQuizLoadingStatus(true));
    const res = await updateDataToBackendAPI({
      userId,
      playLevels: { rewards: rewardsUpdate, timer: timerUpdate },
    });
    dispatch(updaQuizLoadingStatus(false));

    if (!res) {
      //: Tahir show error in UI

      alert("Failed to make api call");
      return;
    }

    dispatch(updateScore(scoreUpdate));
    dispatch(
      updatePlayLevels({
        ...playLevels,
        rewards: rewardsUpdate,
        timer: timerUpdate,
      })
    );
    dispatch(setSuccessPopup(true));
    viberate("light");
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

  const _pointsOnCorrectAnswer = useMemo(() => {
    if (playLevels.rewards === 0) {
      return 100000;
    } else {
      return 100000 * parseInt(playLevels.rewards);
    }
  }, [playLevels.rewards]);

  const _pointsOnWrongAnswer = useMemo(() => {
    if (playLevels.rewards === 0) {
      return 25000;
    } else {
      return 25000 * playLevels.rewards;
    }
  }, [playLevels.rewards]);

  const _timerDuration = useMemo(() => {
    if (playLevels.timer === 0) {
      return 360;
    } else {
      return 360 - playLevels.timer * 60;
    }
  }, [playLevels]);

  return {
    gameScore: finalScore,
    pointsOnCorrectAnswer: _pointsOnCorrectAnswer,
    pointsOnWrongAnswer: _pointsOnWrongAnswer,
    timerDuration: _timerDuration,
    handleAnswerSelected: _handleAnswerSelected,
    handleClaimButtonClick: _handleClaimButtonClick,
    upgradeBoosterLevel: _upgradeBoosterLevel,
    claimTaskPoints: _claimTaskPoints,
    claimLeagueLevel: _claimLeague,
    claimReferralLevel: _claimReferralLevel,
  };
};

export default useGameHook;
