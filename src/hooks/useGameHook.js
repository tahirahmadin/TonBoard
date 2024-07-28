import { useCallback, useMemo } from "react";

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
} from "../reducers/UiReducers";
import useTelegramSDK from "./useTelegramSDK";

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
    (inputOption) => {
      if (ansSelected.length === currentSlotNo * 5 + currentQueNo + 1) {
        return;
      }

      if (!inputOption) {
        return;
      }

      //Update answers array
      let tempAns = [...ansSelected];
      tempAns.push(inputOption);
      dispatch(updateAnsSelected(tempAns));

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
    [ansSelected, currentQueNo, currentSlotNo, quizzes, dispatch]
  );

  const _handleClaimButtonClick = () => {
    let rewardsOnCorrect = _pointsOnCorrectAnswer;
    let rewardsOnWrong = _pointsOnWrongAnswer;

    // update score
    if (ansSelected.length !== 0) {
      let inputOption = ansSelected[ansSelected.length - 1];
      //Update user score
      if (questionData.correct === inputOption) {
        // update points on correct
        dispatch(updateScore(score + rewardsOnCorrect));
      } else {
        // update points on wrong
        dispatch(updateScore(score + rewardsOnWrong));
      }

      if (ansSelected.length % 5 === 0) {
        let nextTimerValue = Date.now() + NEXT_SLOT_TIME;
        dispatch(updateTimerValue(nextTimerValue));
      }
    }
    dispatch(updateQuizPointClaimStatus(true));

    // move to next question if current slot has more otherwise show timer for next slot
    if (ansSelected.length % 5 > 0) {
      dispatch(updateCurrentQueNo((currentQueNo + 1) % 5));
    }

    viberate("medium");
  };

  // FUNCTION:: Handle upgrade booster
  const _upgradeBoosterLevel = async (boosterName, coins) => {
    if (boosterName === "TIMER") {
      await dispatch(updateScore(score - coins));
      await dispatch(
        updatePlayLevels({
          ...playLevels,
          timer: playLevels.timer + 1,
        })
      );
      dispatch(setSuccessPopup(true));
    } else if (boosterName === "REWARDS") {
      dispatch(updateScore(score - coins));
      dispatch(
        updatePlayLevels({
          ...playLevels,
          rewards: playLevels.rewards + 1,
        })
      );
      dispatch(setSuccessPopup(true));
    }
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
