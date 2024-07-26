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

const useSlotTimer = (initHook) => {
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
      dispatch(updateCurrentQueNo((currentQueNo + 1) % 5));
    }
  }, [currentQueNo, currentSlotNo, dispatch]);

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
    console.log("loading quiz data");
    dispatch(updaQuizLoadingStatus(true));
    const res = await axios.get(
      `https://taskdao-backend-rho.vercel.app/api/quiz/current/${_slotNumber}`
    );
    const data = res.data;
    console.log(data);
    dispatch(updaQuizLoadingStatus(false));
    if (data.error) {
      console.log("quiz loading error ", data);
    }
    dispatch(updateQuizData(data.result));
  };

  useEffect(() => {
    if (!initHook) {
      return;
    }

    loadQuizData(currentSlotNo);
  }, [currentSlotNo, initHook]);

  return { isTimerRunning };
};

export default useSlotTimer;
