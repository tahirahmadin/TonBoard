import { useEffect } from "react";
import { useServerAuth } from "./useServerAuth";
import {
  ENERGY_LIMIT_DATA,
  LEAGUE_LEVEL_DATA,
  RECHARGE_SPEED_DATA,
  TAP_DATA,
} from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  getLocalDataSyncWithRedux,
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
} from "../reducers/UiReducers";
import {
  getUserLeaderboardData,
  updateGameDataToBackendAPI,
} from "../actions/serverActions";

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

  const _percentageLeft = (energyLeft * 100) / playValues.energy;

  const { accountSC, username } = useServerAuth();

  //1.  To Manage initial loading of the application
  useEffect(() => {
    async function asyncFn() {
      if (hookInit && accountSC) {
        // Load Backend
        let backendData = await getUserLeaderboardData(accountSC);
        console.log(backendData);
        // Load LocalStorage
        let localData = await localStorage.getItem("ui");
        let localDataObj = JSON.parse(localData);
        console.log(JSON.parse(localData));

        if (localData?.lastUpdatedAt < backendData.lastUpdated) {
          // Update :: LocalStorage
          await dispatch(getLocalDataSyncWithRedux());
          await dispatch(updateScreenLoaded(true));
        }
        if (localData?.lastUpdatedAt > backendData.lastUpdated) {
          // Update :: Backend
          await updateGameDataToBackendAPI(localDataObj, accountSC);
        }
        // Sync latest data to redux
        await dispatch(getLocalDataSyncWithRedux());
        await dispatch(updateScreenLoaded(true));

        // To update username
        if (
          (backendData.username === "" && username) ||
          backendData.username !== username
        ) {
          await updateGameDataToBackendAPI({ username: username }, accountSC);
        }
      }
    }

    asyncFn();
  }, [accountSC, hookInit]);

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
    tapScore,
    energyLeft,
    playLevels.tap,
    playLevels.energy,
    playLevels.recharge,
    playValues.tap,
    playValues.energy,
    playValues.recharge,
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

  //5. Energy Full on Purchase of Energy Booster
  useEffect(() => {
    if (hookInit) {
      dispatch(updateEnergyLeft(playValues.energy));
    }
  }, [playValues.energy, hookInit]);

  // FUNCTION:: Handle tap on screen
  const _updateOnTapAction = () => {
    let tapPoints = multiTapFlag ? playValues.tap * 5 : playValues.tap;
    console.log(tapPoints);
    dispatch(updateScore(score + tapPoints));
    dispatch(updateTapScore(tapScore + tapPoints));
    dispatch(updateEnergyLeft(energyLeft - tapPoints));
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
      }, 20000);
    }

    if (multiTapStamp.length === 3 && nextUnlockTime > multiTapStamp[0]) {
      //RESET BOOSTER
      await dispatch(updateMultiTapStamp([Date.now()]));
      await dispatch(updateMultiTap(true));
      dispatch(setSuccessPopup(true));
      setTimeout(() => {
        dispatch(updateMultiTap(false));
      }, 20000);
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
    console.log(inputLevel);
    let pointsToAdd = LEAGUE_LEVEL_DATA[inputLevel].coinsRequired;
    await dispatch(updateScore(score + pointsToAdd));
    await dispatch(updateLeagueLevel(inputLevel + 1));
    dispatch(setSuccessPopup(true));
  };

  // FUNCTION:: Referral level
  const _claimReferralLevel = async (inputPoints) => {
    console.log(inputPoints);
    await dispatch(updateScore(score + inputPoints));
    dispatch(setSuccessPopup(true));
  };

  return {
    gameScore: score,
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
