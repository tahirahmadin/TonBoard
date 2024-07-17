import { useEffect, useMemo } from "react";
import { useServerAuth } from "./useServerAuth";
import {
  ENERGY_LIMIT_DATA,
  LEAGUE_LEVEL_DATA,
  LEAGUE_TASKS_DATA,
  RECHARGE_SPEED_DATA,
  TAP_DATA,
} from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  updateLocalDataToRedux,
  setSuccessPopup,
  updateEnergyLeft,
  updateFullHungerStamp,
  updateLeagueLevel,
  updateMultiTap,
  updateMultiTapStamp,
  updatePlayLevels,
  updatePlayValues,
  updateScore,
  updateScreenLoaded,
  updateTapScore,
  updateReferralCount,
  updateReferralPoints,
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
  const tapScore = useSelector((state) => state.ui.tapScore);
  const multiTapFlag = useSelector((state) => state.ui.multiTapFlag);
  const multiTapStamp = useSelector((state) => state.ui.multiTapStamp);
  const fullHungerStamp = useSelector((state) => state.ui.fullHungerStamp);
  const energyLeft = useSelector((state) => state.ui.energyLeft);
  const leagueLevel = useSelector((state) => state.ui.leagueLevel);
  const playLevels = useSelector((state) => state.ui.playLevels);
  const playValues = useSelector((state) => state.ui.playValues);
  const referralCount = useSelector((state) => state.ui.referralCount);
  const referralPoints = useSelector((state) => state.ui.referralPoints);

  const specialTasksStatus = useSelector(
    (state) => state.ui.specialTasksStatus
  );
  const leagueTasksStatus = useSelector((state) => state.ui.leagueTasksStatus);
  const refTasksStatus = useSelector((state) => state.ui.refTasksStatus);

  const _percentageLeft = (energyLeft * 100) / playValues.energy;

  const { accountSC, username } = useServerAuth();
  const { telegramUsername, telegramPhotoUrl } = useTelegramSDK();

  //1.  To Manage initial loading of the application
  useEffect(() => {
    async function asyncFn() {
      if (hookInit && accountSC) {
        await dispatch(updateLocalDataToRedux());
        //1.  Load Backend
        let backendData = await getUserLeaderboardData(accountSC);

        if (backendData.referralPoints) {
          await dispatch(updateReferralCount(backendData.referralCount));
          await dispatch(updateReferralPoints(backendData.referralPoints));
        }
        if (
          (backendData && telegramUsername && backendData.username === "") ||
          backendData.username !== telegramUsername
        ) {
          // Update Local Data to Backend server
          await updateLocalDataToBackendAPI(
            { username: telegramUsername },
            accountSC
          );
        }

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
    leagueLevel,
    specialTasksStatus,
    leagueTasksStatus,
    refTasksStatus,
    tapScore,
    energyLeft,
    playLevels.tap,
    playLevels.energy,
    playLevels.recharge,
    playValues.tap,
    playValues.energy,
    playValues.recharge,
    referralCount,
    referralPoints,
  ]);

  //3. Update playValues after levelData changes
  useEffect(() => {
    if (playLevels && hookInit) {
      dispatch(
        updatePlayValues({
          tap: TAP_DATA[playLevels.tap].tapCount,
          energy: ENERGY_LIMIT_DATA[playLevels.energy]?.energyLimit,
          recharge: RECHARGE_SPEED_DATA[playLevels.recharge].speed,
        })
      );
    }
  }, [playLevels.tap, playLevels.energy, playLevels.recharge, hookInit]);

  //4. Energy Restore per second
  useEffect(() => {
    const interval = setTimeout(() => {
      if (energyLeft && playValues.recharge && playValues.energy) {
        let newEnergyValue = Math.min(
          energyLeft + playValues.recharge,
          playValues.energy
        );
        dispatch(updateEnergyLeft(newEnergyValue));
      } else {
        dispatch(updateEnergyLeft(playValues.energy));
      }
    }, 1000); // Restore energy points every second

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [playValues.recharge, playValues.energy, energyLeft]);

  // Final Score = score + referral score
  const finalScore = useMemo(() => {
    return score + referralPoints;
  }, [score, referralPoints]);

  // FUNCTION:: Handle tap on screen
  const _updateOnTapAction = () => {
    let tapPoints = multiTapFlag ? playValues.tap * 5 : playValues.tap;
    let energyToReduce = multiTapFlag ? 0 : playValues.tap;
    console.log(tapPoints);
    dispatch(updateScore(score + tapPoints));
    dispatch(updateTapScore(tapScore + tapPoints));
    dispatch(updateEnergyLeft(energyLeft - energyToReduce));
  };

  // FUNCTION:: Handle upgrade booster
  const _upgradeBoosterLevel = async (boosterName, coins) => {
    if (boosterName === "TAP") {
      await dispatch(updateScore(score - coins));
      await dispatch(
        updatePlayLevels({
          ...playLevels,
          tap: playLevels.tap + 1,
        })
      );
      dispatch(setSuccessPopup(true));
    } else if (boosterName === "ENERGY") {
      dispatch(updateScore(score - coins));
      dispatch(
        updatePlayLevels({
          ...playLevels,
          energy: playLevels.energy + 1,
        })
      );
      dispatch(setSuccessPopup(true));
    } else if (boosterName === "RECHARGE") {
      dispatch(updateScore(score - coins));
      dispatch(
        updatePlayLevels({
          ...playLevels,
          recharge: playLevels.recharge + 1,
        })
      );
      dispatch(setSuccessPopup(true));
    }
  };

  // FUNCTION:: Enable MultiTap Booster for 20 Sec
  const _enableMultiTap = async () => {
    let nextUnlockTime = Date.now() - 86400000;
    if (!multiTapFlag && multiTapStamp.length < 3) {
      //ADD Timestamp into BOOSTER

      const tempBoosterStamp = [...multiTapStamp, Date.now()];

      await dispatch(updateMultiTapStamp(tempBoosterStamp));
      await dispatch(updateMultiTap(true));
      dispatch(setSuccessPopup(true));
      setTimeout(() => {
        dispatch(updateMultiTap(false));
      }, 60000);
    }

    if (multiTapStamp.length === 3 && nextUnlockTime > multiTapStamp[0]) {
      //RESET BOOSTER
      await dispatch(updateMultiTapStamp([Date.now()]));
      await dispatch(updateMultiTap(true));
      dispatch(setSuccessPopup(true));
      setTimeout(() => {
        dispatch(updateMultiTap(false));
      }, 60000);
    }
  };

  // FUNCTION:: Claim max energy upto 3 times
  const _claimFullEnergy = async () => {
    let nextUnlockTime = Date.now() - 86400000;
    if (fullHungerStamp.length < 3) {
      //ADD Timestamp into Hunger Booster
      const tempBoosterStamp = [...fullHungerStamp, Date.now()];
      await dispatch(updateEnergyLeft(playValues.energy));
      await dispatch(updateFullHungerStamp(tempBoosterStamp));

      dispatch(setSuccessPopup(true));
    }

    if (fullHungerStamp.length === 3 && nextUnlockTime > fullHungerStamp[0]) {
      //RESET BOOSTER
      await dispatch(updateEnergyLeft(playValues.energy));
      await dispatch(updateFullHungerStamp([Date.now()]));
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
    gameLeagueLevel: leagueLevel,
    gameEnergyLeft: energyLeft,
    gamePlayLevels: playLevels,
    gamePlayValues: playValues,
    gamePercentageLeft: _percentageLeft,
    updateOnTapAction: _updateOnTapAction,
    upgradeBoosterLevel: _upgradeBoosterLevel,
    enableMultiTap: _enableMultiTap,
    claimFullEnergy: _claimFullEnergy,
    claimTaskPoints: _claimTaskPoints,
    claimLeagueLevel: _claimLeague,
    claimReferralLevel: _claimReferralLevel,
  };
};

export default useGameHook;
