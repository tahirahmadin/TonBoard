import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updaQuizLoadingStatus,
  updateCurrentQueNo,
  updateCurrentSlotNo,
  updateQuizData,
  updateTimerRunningStatus,
} from "../reducers/UiReducers";
import axios from "axios";
import { getQuizData } from "../actions/serverActions";

const useSlotTimer = (initHook) => {
  const timerValue = useSelector((state) => state.ui.timerValue);
  const currentQueNo = useSelector((state) => state.ui.currentQueNo);
  const currentSlotNo = useSelector((state) => state.ui.currentSlotNo);
  const screenLoaded = useSelector((state) => state.ui.screenLoaded);
  const isTimerRunning = useSelector((state) => state.ui.isTimerRunning);
  const isBackendLoaded = useSelector((state) => state.ui.isBackendLoaded);

  const dispatch = useDispatch();

  const handleTimerExpire = useCallback(async () => {
    if (!isBackendLoaded) {
      console.log("skipping sync backend not loaded yet ");
      return;
    }

    dispatch(updateTimerRunningStatus(false));

    // question and slot update needed
    if ((currentQueNo + 1) % 5 === 0) {
      dispatch(updateCurrentSlotNo(currentSlotNo + 1));
      dispatch(updateCurrentQueNo((currentQueNo + 1) % 5));

      await loadQuizData(currentSlotNo + 1);
    }
  }, [currentQueNo, currentSlotNo, dispatch, isBackendLoaded]);

  useEffect(() => {
    if (!initHook) {
      return;
    }

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
  }, [timerValue, handleTimerExpire, screenLoaded, initHook]);

  const loadQuizData = async (_slotNumber) => {
    dispatch(updaQuizLoadingStatus(true));

    const quizData = await getQuizData(_slotNumber);

    dispatch(updaQuizLoadingStatus(false));

    dispatch(updateQuizData(quizData));
  };

  // useEffect(() => {
  //   if (!initHook, auth) {
  //     return;
  //   }

  //   loadQuizData(currentSlotNo);
  // }, [currentSlotNo, initHook]);

  return { isTimerRunning };
};

export default useSlotTimer;
