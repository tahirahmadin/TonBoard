import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSuccessPopup,
  updateScore,
  getBackendDataToRedux,
  updateCurrentQuestion,
} from "../reducers/UiReducers";
import useTelegramSDK from "./useTelegramSDK";
import { useServerAuth } from "./useServerAuth";

const useGameHook = (hookInit = false) => {
  const dispatch = useDispatch();

  const { accountSC } = useServerAuth();
  const { viberate } = useTelegramSDK();

  const score = useSelector((state) => state.ui.score);
  const playLevels = useSelector((state) => state.ui.playLevels);
  const referralPoints = useSelector((state) => state.ui.referralPoints);

  //1.  To Manage initial loading of the application
  useEffect(() => {
    async function asyncFn() {
      if (hookInit && accountSC) {
        // //1.  Load Backend
        dispatch(getBackendDataToRedux(accountSC));
        dispatch(updateCurrentQuestion(accountSC));
      }
    }

    asyncFn();
  }, [accountSC, hookInit, dispatch]);

  // 2. Final Score = score + referral score
  const finalScore = useMemo(() => {
    return score + referralPoints;
  }, [score, referralPoints]);

  const _handleNextButtonClick = async () => {
    dispatch(updateCurrentQuestion(accountSC));

    viberate("medium");
  };

  // FUNCTION:: Claim Points
  const _claimTaskPoints = async (inputPoints) => {
    await dispatch(updateScore(score + inputPoints));
    viberate("light");
    dispatch(setSuccessPopup(true));
  };

  const _pointsOnWrongAnswer = 250;

  const _timerDuration = 60;

  return {
    gameScore: finalScore,
    pointsOnWrongAnswer: _pointsOnWrongAnswer,
    timerDuration: _timerDuration,
    handleNextButtonClick: _handleNextButtonClick,
    claimTaskPoints: _claimTaskPoints,
  };
};

export default useGameHook;
