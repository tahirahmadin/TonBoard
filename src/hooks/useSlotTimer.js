import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateCurrentQueNo,
  updateCurrentSlotNo,
} from "../reducers/UiReducers";

const useSlotTimer = () => {
  const timerValue = useSelector((state) => state.ui.timerValue);
  const currentQueNo = useSelector((state) => state.ui.currentQueNo);
  const currentSlotNo = useSelector((state) => state.ui.currentSlotNo);
  const screenLoaded = useSelector((state) => state.ui.screenLoaded);

  const dispatch = useDispatch();

  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const handleTimerExpire = useCallback(() => {
    console.log("timer expire event");
    setIsTimerRunning(false);

    // question and slot update needed
    if ((currentQueNo + 1) % 5 === 0) {
      dispatch(updateCurrentSlotNo(currentSlotNo + 1));
      dispatch(updateCurrentQueNo(currentQueNo + 1));
    }
  }, [currentQueNo, currentSlotNo, dispatch]);

  console.log({ isTimerRunning });
  useEffect(() => {
    if (!screenLoaded) return;
    if (!timerValue) return;

    const intervalId = setInterval(() => {
      const currentTime = Date.now();
      if (currentTime >= timerValue) {
        handleTimerExpire();
        clearInterval(intervalId);
      } else {
        setIsTimerRunning(true);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timerValue, handleTimerExpire, screenLoaded]);

  return { isTimerRunning };
};

export default useSlotTimer;
