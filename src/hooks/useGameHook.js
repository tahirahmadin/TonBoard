import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSuccessPopup,
  updateScore,
  getBackendDataToRedux,
  updateNextQueNo,
} from "../reducers/UiReducers";
import useTelegramSDK from "./useTelegramSDK";
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
    await dispatch(updateNextQueNo());
    viberate("medium");
  };

  // FUNCTION:: Claim Points
  const _claimTaskPoints = async (inputPoints) => {
    await dispatch(updateScore(score + inputPoints));
    viberate("light");
    dispatch(setSuccessPopup(true));
  };

  const _pointsOnCorrectAnswer = 1000;

  const _pointsOnWrongAnswer = 250;

  const _timerDuration = 60;

  return {
    gameScore: finalScore,
    questionData: questionData,
    pointsOnCorrectAnswer: _pointsOnCorrectAnswer,
    pointsOnWrongAnswer: _pointsOnWrongAnswer,
    timerDuration: _timerDuration,
    handleNextButtonClick: _handleNextButtonClick,
    claimTaskPoints: _claimTaskPoints,
  };
};

export default useGameHook;
