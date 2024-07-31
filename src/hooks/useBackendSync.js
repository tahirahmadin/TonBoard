import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateBackendSyncStatus,
  updateBackendToRedux,
  updateLocalDataToRedux,
  updateScreenLoaded,
} from "../reducers/UiReducers";
import {
  getQuizData,
  getUserData,
  updateLocalDataToBackendAPI,
} from "../actions/serverActions";
import { useServerAuth } from "./useServerAuth";

// sync backend in every 1 min if not synced
const BACKEND_SYNC_INTERVAL = 30 * 1000;

const useBackendSync = (initHook = false) => {
  const isBackendSynced = useSelector((state) => state.ui.isBackendSynced);
  const { accountSC } = useServerAuth();
  const ui = useSelector((state) => state.ui);

  const dispatch = useDispatch();

  const handleSync = useCallback(async () => {
    console.log("syncing backend");

    updateLocalDataToBackendAPI(accountSC);

    dispatch(updateBackendSyncStatus(true));
  }, [dispatch, accountSC]);

  useEffect(() => {
    if (!initHook) return;
    if (isBackendSynced) return;

    const intervalId = setInterval(() => {
      handleSync();
    }, BACKEND_SYNC_INTERVAL);

    return () => clearInterval(intervalId);
  }, [initHook, isBackendSynced, handleSync]);

  // Initial state loading
  useEffect(() => {
    async function asyncFn() {
      if (initHook || accountSC) {
        let tempLocalStorageData = localStorage.getItem("ui");
        if (tempLocalStorageData) {
          console.log("updating from local storage");
          tempLocalStorageData = JSON.parse(tempLocalStorageData);

          if (tempLocalStorageData?.quizzes?.length > 0) {
            dispatch(updateLocalDataToRedux(tempLocalStorageData));
            return;
          }
        }

        console.log("updating from backend");

        let backendData = await getUserData(accountSC);
        console.log({ backendData });
        const quizData = await getQuizData(backendData.currentSlotNo);
        console.log({ quizData });
        dispatch(
          updateBackendToRedux({
            ...backendData,
            quizzes: quizData,
            isBackendLoaded: true,
          })
        );

        dispatch(updateScreenLoaded(true));
      }
    }

    asyncFn();
  }, [accountSC, initHook, dispatch]);

  //Sync redux state with localStorage
  useEffect(() => {
    async function asyncFn() {
      if (accountSC && initHook) {
        localStorage.setItem("ui", JSON.stringify(ui));
      }
    }
    asyncFn();
  }, [accountSC, ui, initHook]);

  return {};
};

export default useBackendSync;
