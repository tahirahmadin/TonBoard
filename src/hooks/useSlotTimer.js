import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateCurrentQuestion,
  updateTimerRunningStatus,
} from "../reducers/UiReducers";
import { useServerAuth } from "./useServerAuth";

const useSlotTimer = (initHook) => {
  const timerValue = useSelector((state) => state.ui.timerValue);
  // const currentQueNo = useSelector((state) => state.ui.currentQueNo);
  // const currentSlotNo = useSelector((state) => state.ui.currentSlotNo);
  const screenLoaded = useSelector((state) => state.ui.screenLoaded);
  const isTimerRunning = useSelector((state) => state.ui.isTimerRunning);
  const isBackendLoaded = useSelector((state) => state.ui.isBackendLoaded);
  const { accountSC } = useServerAuth();

  const dispatch = useDispatch();

  const handleTimerExpire = useCallback(async () => {
    if (!accountSC) {
      console.log("skipping sync backend not loaded yet ");
      return;
    }

    dispatch(updateTimerRunningStatus(false));

    dispatch(updateCurrentQuestion(accountSC));
  }, [dispatch, accountSC]);

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

  return { isTimerRunning };
};

export default useSlotTimer;
