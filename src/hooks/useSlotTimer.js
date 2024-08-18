import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateQuizLoadingStatus,
  updateCurrentQueNo,
  updateCurrentSlotNo,
  updateTimerRunningStatus,
} from "../reducers/UiReducers";
import { getQuizData, updateDataToBackendAPI } from "../actions/serverActions";

const useSlotTimer = (initHook) => {
  const timerValue = useSelector((state) => state.ui.timerValue);
  const currentQueNo = useSelector((state) => state.ui.currentQueNo);
  const currentSlotNo = useSelector((state) => state.ui.currentSlotNo);
  const screenLoaded = useSelector((state) => state.ui.screenLoaded);
  const isTimerRunning = useSelector((state) => state.ui.isTimerRunning);
  const isBackendLoaded = useSelector((state) => state.ui.isBackendLoaded);
  const userId = useSelector((state) => state.ui.userId);

  const dispatch = useDispatch();

  const handleTimerExpire = useCallback(async () => {
    if (!isBackendLoaded) {
      console.log("skipping sync backend not loaded yet ");
      return;
    }

    dispatch(updateTimerRunningStatus(false));

    dispatch(updateQuizLoadingStatus(true));
    // question and slot update needed
    if ((currentQueNo + 1) % 5 === 0) {
      const nextSlotNumber = currentSlotNo + 1;
      const nextQuestionNumber = (currentQueNo + 1) % 5;

      const res = await updateDataToBackendAPI({
        userId,
        currentSlotNo: nextSlotNumber,
        currentQueNo: nextQuestionNumber,
      });

      if (!res) {
        //:Tahir display error on UI failed to make api call
        alert("Failed to load new quizzes please refresh");
        return;
      }

      dispatch(updateCurrentSlotNo(nextSlotNumber));
      dispatch(updateCurrentQueNo(nextQuestionNumber));

      await loadQuizData(nextSlotNumber);
    }

    dispatch(updateQuizLoadingStatus(false));
  }, [currentQueNo, currentSlotNo, dispatch, isBackendLoaded, userId]);

  useEffect(() => {
    if (!initHook) {
      return;
    }

    if (!screenLoaded) return;
    if (!timerValue) return;

    if (timerValue < Date.now() && !isTimerRunning) {
      console.log("timer has already expired");
      return;
    }

    const intervalId = setInterval(() => {
      const currentTime = Date.now();
      if (currentTime >= timerValue) {
        handleTimerExpire();
        clearInterval(intervalId);
      } else {
        dispatch(updateTimerRunningStatus(true));
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [
    timerValue,
    handleTimerExpire,
    screenLoaded,
    initHook,
    dispatch,
    isTimerRunning,
  ]);

  const loadQuizData = async (_slotNumber) => {
    const quizData = await getQuizData(_slotNumber);
  };
  return { isTimerRunning };
};

export default useSlotTimer;
