import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateDisplayData, updateRefetch } from "../reducers/UiReducers";
import {
  getDashboardData,
  getReferralsData,
  getUserLeaderboardData,
} from "../actions/serverActions";
import { useServerAuth } from "./useServerAuth";

// Hook to load and manage display data for referrals, Dashboard and Rankings
const useDashboardData = (initHook = false) => {
  const { accountSC } = useServerAuth();
  const displayData = useSelector((state) => state.ui.displayData);
  const refetch = useSelector((state) => state.ui.refetch);

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const refreshData = useCallback(() => {
    dispatch(updateRefetch(refetch + 1));
  }, [refetch, dispatch]);

  //Sync redux state with localStorage
  useEffect(() => {
    if (!accountSC || !initHook) {
      return;
    }

    console.log("refreshing data  ", { refetch, initHook });

    async function loadData() {
      //   handle data loading
      setLoading(true);
      const [progressItems, rankings, referrals] = await Promise.all([
        getDashboardData(accountSC),
        getUserLeaderboardData(accountSC),
        getReferralsData(accountSC),
      ]);

      console.log("display data loaded");
      dispatch(updateDisplayData({ progressItems, rankings, referrals }));
      setLoading(false);
    }
    loadData();
  }, [accountSC, initHook, refetch, dispatch]);

  const { progressItems, rankings, referrals } = displayData;
  return { progressItems, referrals, rankings, loading, refreshData };
};

export default useDashboardData;
