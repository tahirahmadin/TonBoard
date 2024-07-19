import { useEffect, useMemo } from "react";
import { useServerAuth } from "./useServerAuth";
import { LEAGUE_TASKS_DATA, QUIZ_DATA } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  updateLocalDataToRedux,
  setSuccessPopup,
  updateLeagueLevel,
  updatePlayLevels,
  updateScore,
  updateScreenLoaded,
  updateAnsSelected,
} from "../reducers/UiReducers";
import {
  getUserLeaderboardData,
  updateLocalDataToBackendAPI,
} from "../actions/serverActions";
import useTelegramSDK from "./useTelegramSDK";

const useGameHook = (hookInit = false) => {
  const dispatch = useDispatch();
  const ui = useSelector((state) => state.ui);
  const score = useSelector((state) => state.ui.score);
  const currentQueNo = useSelector((state) => state.ui.currentQueNo);
  const ansSelected = useSelector((state) => state.ui.ansSelected);

  const leagueLevel = useSelector((state) => state.ui.leagueLevel);
  const playLevels = useSelector((state) => state.ui.playLevels);
  const referralCount = useSelector((state) => state.ui.referralCount);
  const referralPoints = useSelector((state) => state.ui.referralPoints);

  const specialTasksStatus = useSelector(
    (state) => state.ui.specialTasksStatus
  );
  const leagueTasksStatus = useSelector((state) => state.ui.leagueTasksStatus);
  const refTasksStatus = useSelector((state) => state.ui.refTasksStatus);

  const { accountSC, username } = useServerAuth();
  const { telegramUsername, telegramPhotoUrl } = useTelegramSDK();

  //1.  To Manage initial loading of the application
  useEffect(() => {
    async function asyncFn() {
      if (hookInit && accountSC) {
        await localStorage.removeItem("ui");
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
        await dispatch(updateScreenLoaded(true));
      }
    }

    asyncFn();
  }, [accountSC, hookInit, telegramUsername]);

  //2. Updating localStorage on every change
  useEffect(() => {
    async function asyncFn() {
      if (accountSC && hookInit) {
        await localStorage.setItem("ui", JSON.stringify(ui));
      }
    }

    asyncFn();
  }, [
    score,
    ansSelected,
    currentQueNo,
    leagueLevel,
    playLevels.timer,
    playLevels.rewards,
    referralCount,
    referralPoints,
    specialTasksStatus,
    leagueTasksStatus,
    refTasksStatus,
  ]);

  //4. Energy Restore per second
  // useEffect(() => {
  //   const interval = setTimeout(() => {
  //     if (energyLeft && playValues.recharge && playValues.energy) {
  //       let newEnergyValue = Math.min(
  //         energyLeft + playValues.recharge,
  //         playValues.energy
  //       );
  //       dispatch(updateEnergyLeft(newEnergyValue));
  //     } else {
  //       dispatch(updateEnergyLeft(playValues.energy));
  //     }
  //   }, 1000); // Restore energy points every second

  //   return () => clearInterval(interval); // Clear interval on component unmount
  // }, [playValues.recharge, playValues.energy, energyLeft]);

  // Final Score = score + referral score
  const finalScore = useMemo(() => {
    return score + referralPoints;
  }, [score, referralPoints]);

  // FUNCTION:: Handle select question
  const _handleAnswerSelected = (inputOption) => {
    let rewardsOnCorrect = 1000 * playLevels.rewards;
    let tempAns = [...ansSelected];
    tempAns[currentQueNo] = inputOption;
    dispatch(updateAnsSelected(tempAns));

    if (QUIZ_DATA[currentQueNo].correct === inputOption) {
      dispatch(updateScore(score + rewardsOnCorrect));
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

  return {
    gameScore: finalScore,
    handleAnswerSelected: _handleAnswerSelected,
    upgradeBoosterLevel: _upgradeBoosterLevel,
    claimTaskPoints: _claimTaskPoints,
    claimLeagueLevel: _claimLeague,
    claimReferralLevel: _claimReferralLevel,
  };
};

export default useGameHook;
