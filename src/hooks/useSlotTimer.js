import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateCurrentQueNo,
  updateCurrentSlotNo,
  updateTimerRunningStatus,
} from "../reducers/UiReducers";

const useSlotTimer = () => {
  const timerValue = useSelector((state) => state.ui.timerValue);
  const currentQueNo = useSelector((state) => state.ui.currentQueNo);
  const currentSlotNo = useSelector((state) => state.ui.currentSlotNo);
  const screenLoaded = useSelector((state) => state.ui.screenLoaded);
  const isTimerRunning = useSelector((state) => state.ui.isTimerRunning);

  const dispatch = useDispatch();

  const handleTimerExpire = useCallback(() => {
    dispatch(updateTimerRunningStatus(false));

    // question and slot update needed
    if ((currentQueNo + 1) % 5 === 0) {
      dispatch(updateCurrentSlotNo(currentSlotNo + 1));
      dispatch(updateCurrentQueNo(currentQueNo + 1));
    }
  }, [currentQueNo, currentSlotNo, dispatch]);

  useEffect(() => {
    if (!screenLoaded) return;
    if (!timerValue) return;

    if (timerValue < Date.now() && !isTimerRunning) {
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
  }, [timerValue, handleTimerExpire, screenLoaded]);

  return { isTimerRunning };
};

export default useSlotTimer;
