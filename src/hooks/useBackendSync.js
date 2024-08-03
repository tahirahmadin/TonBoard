import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateBackendToRedux,
  updateScreenLoaded,
} from "../reducers/UiReducers";
import { getUserData } from "../actions/serverActions";
import { useServerAuth } from "./useServerAuth";

// sync backend in every 1 min if not synced
const BACKEND_SYNC_INTERVAL = 30 * 1000;

const useBackendSync = (initHook = false) => {
  const isBackendSynced = useSelector((state) => state.ui.isBackendSynced);
  const userData = useSelector((state) => state.ui);
  const { accountSC } = useServerAuth();
  const ui = useSelector((state) => state.ui);

  const dispatch = useDispatch();

  // const handleSync = useCallback(async () => {
  //   console.log("syncing backend");

  //   updateDataToBackendAPI(userData);

  //   dispatch(updateBackendSyncStatus(true));
  // }, [dispatch, userData]);

  // useEffect(() => {
  //   if (!initHook) return;
  //   if (isBackendSynced) return;

  //   const intervalId = setInterval(() => {
  //     handleSync();
  //   }, BACKEND_SYNC_INTERVAL);

  //   return () => clearInterval(intervalId);
  // }, [initHook, isBackendSynced, handleSync]);

  // Initial state loading
  useEffect(() => {
    async function asyncFn() {
      if (initHook && accountSC) {
        const userData = await getUserData(accountSC);

        if (!userData) {
          alert("Failed to load user");
          return;
        }
        console.log({ userData });

        dispatch(updateBackendToRedux({ ...userData, isBackendLoaded: true }));

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
