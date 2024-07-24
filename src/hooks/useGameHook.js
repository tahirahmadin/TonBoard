import { useCallback, useEffect, useMemo, useState } from "react";
import { useServerAuth } from "./useServerAuth";
import { LEAGUE_TASKS_DATA } from "../utils/constants";
import QUIZ_DATA from "../utils/questions.json";
import { useDispatch, useSelector } from "react-redux";
import {
  updateLocalDataToRedux,
  setSuccessPopup,
  updateLeagueLevel,
  updatePlayLevels,
  updateScore,
  updateScreenLoaded,
  updateAnsSelected,
  updateCurrentQueNo,
  updateTimerValue,
  updateCurrentSlotNo,
  updateQuizPointClaimStatus,
} from "../reducers/UiReducers";
import {
  getUserLeaderboardData,
  updateLocalDataToBackendAPI,
} from "../actions/serverActions";
import useTelegramSDK from "./useTelegramSDK";

// delay for next quiz slot
const NEXT_SLOT_TIME = 60 * 1000; //21600000;

const useGameHook = (hookInit = false) => {
  const dispatch = useDispatch();
  const ui = useSelector((state) => state.ui);
  const score = useSelector((state) => state.ui.score);
  const currentQueNo = useSelector((state) => state.ui.currentQueNo);
  const currentSlotNo = useSelector((state) => state.ui.currentSlotNo);
  const ansSelected = useSelector((state) => state.ui.ansSelected);
  const leagueLevel = useSelector((state) => state.ui.leagueLevel);
  const playLevels = useSelector((state) => state.ui.playLevels);
  const referralCount = useSelector((state) => state.ui.referralCount);
  const referralPoints = useSelector((state) => state.ui.referralPoints);
  const timerValue = useSelector((state) => state.ui.timerValue);
  const screenLoaded = useSelector((state) => state.ui.screenLoaded);
  const isSlotWaitingForClaim = useSelector(
    (state) => state.ui.isSlotWaitingForClaim
  );

  const specialTasksStatus = useSelector(
    (state) => state.ui.specialTasksStatus
  );
  const leagueTasksStatus = useSelector((state) => state.ui.leagueTasksStatus);
  const refTasksStatus = useSelector((state) => state.ui.refTasksStatus);

  const { accountSC, username } = useServerAuth();
  const { telegramUsername, telegramPhotoUrl, viberate } = useTelegramSDK();

  //1.  To Manage initial loading of the application
  useEffect(() => {
    async function asyncFn() {
      if (hookInit && accountSC) {
        // await localStorage.removeItem("ui");
        await dispatch(updateLocalDataToRedux());
        //1.  Load Backend
        // let backendData = await getUserLeaderboardData(accountSC);
        // console.log(backendData);

        // if (backendData.referralPoints) {
        //   await dispatch(updateReferralCount(backendData.referralCount));
        //   await dispatch(updateReferralPoints(backendData.referralPoints));
        // }
        // if (
        //   (backendData && telegramUsername && backendData.username === "") ||
        //   backendData.username !== telegramUsername
        // ) {
        //   // Update Local Data to Backend server
        //   await updateUsernameToBackendAPI(
        //     { username: telegramUsername },
        //     accountSC
        //   );
        // }
        // await dispatch(updateLocalDataToBackend(accountSC));
        dispatch(updateScreenLoaded(true));
      }
    }

    asyncFn();
  }, [accountSC, hookInit, telegramUsername, dispatch]);

  //2. Updating localStorage on every change
  useEffect(() => {
    async function asyncFn() {
      if (accountSC && hookInit) {
        await localStorage.setItem("ui", JSON.stringify(ui));
      }
    }

    asyncFn();
  }, [accountSC, ui, hookInit]);

  // Final Score = score + referral score
  const finalScore = useMemo(() => {
    return score + referralPoints;
  }, [score, referralPoints]);

  // FUNCTION:: Handle select question
  const _handleAnswerSelected = useCallback(
    (inputOption) => {
      if (ansSelected.length === currentQueNo + 1) {
        console.log("already marked");
        return;
      }

      if (!inputOption) {
        return;
      }

      //Update answers array
      let tempAns = [...ansSelected];
      tempAns[currentQueNo] = inputOption;
      dispatch(updateAnsSelected(tempAns));

      // if (tempAns.length % 5 === 0) {
      //   let nextTimerValue = Date.now() + 60 * 1000; //21600000;
      //   dispatch(updateTimerValue(nextTimerValue));
      // }
      // reset claim status on new ans selection
      dispatch(updateQuizPointClaimStatus(false));
    },
    [ansSelected, currentQueNo, dispatch]
  );

  const _handleClaimButtonClick = () => {
    let rewardsOnCorrect = _pointsOnCorrectAnswer;
    let rewardsOnWrong = _pointsOnWrongAnswer;

    // update score
    if (ansSelected.length !== 0) {
      let inputOption = ansSelected[ansSelected.length - 1];
      //Update user score
      if (QUIZ_DATA[currentQueNo].correct === inputOption) {
        console.log("correct");
        // update points on correct
        dispatch(updateScore(score + rewardsOnCorrect));
      } else {
        console.log("wrong");
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
      dispatch(updateCurrentQueNo(currentQueNo + 1));
    }
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
  };

  // FUNCTION:: Claim Points
  const _claimTaskPoints = async (inputPoints) => {
    await dispatch(updateScore(score + inputPoints));
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
  }, [playLevels.rewards]);

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
