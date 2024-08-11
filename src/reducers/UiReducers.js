import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getUserBackendData,
  updateDataToBackendAPI,
  upgradeBoosterToBackend,
} from "../actions/serverActions";

const initialState = {
  username: null,
  userId: null,
  profilePic: null,
  score: 0,
  quizzes: [],
  isQuizLoading: false,
  quizPoints: 0,
  referralPoints: 0,
  referralCount: 0,
  workPoints: 0,
  leagueLevel: 0,
  currentSlotNo: 0,
  currentQueNo: 0,
  ansSelected: [],
  isQuizPointsClaimed: false,
  isTimerRunning: false,
  playLevels: {
    timer: 1,
    rewards: 1,
  },
  refetch: 0,
  successPopup: false,
  specialTasksStatus: [],
  leagueTasksStatus: [],
  refTasksStatus: [],
  screenLoaded: false,
  timerValue: 0,
  isExploding: false,
  isBackendSynced: false,
  isBackendLoaded: false,
  displayData: { progressItems: [], rankings: [], referrals: [] },
};

// Function:: get backend data and update redux
export const getBackendDataToRedux = createAsyncThunk(
  "getBackendDataToRedux",
  async (userId) => {
    try {
      let response = await getUserBackendData(userId);

      if (response) {
        return response;
      }
      return null;
    } catch (error) {
      console.log(error);
    }
  }
);

// Function: To upgrade booster
export const upgradeBoosterRedux = createAsyncThunk(
  "upgradeBoosterRedux",
  async (dataObj) => {
    try {
      console.log("dataObj");
      console.log(dataObj);
      let response = await upgradeBoosterToBackend(dataObj);
      console.log("response");
      console.log(response);

      if (response.error === false) {
        return {
          type: dataObj.type,
          points: response.msg,
        };
      }
      return null;
    } catch (error) {
      console.log(error);
    }
  }
);

// Function: To mark answer to backend
export const updateSelectedAnswerRedux = createAsyncThunk(
  "updateSelectedAnswerRedux",
  async (dataObj) => {
    try {
      console.log("dataObj");
      console.log(dataObj);

      //Update answers array

      const response = await updateDataToBackendAPI({
        userId: dataObj.userId,
        inputOption: dataObj.inputOption,
      });

      console.log("response");
      console.log(response);

      if (response.error === false) {
        return {
          inputOption: dataObj.inputOption,
          points: response.result.points,
          correctOption: response.result.correctOption,
        };
      }
      return null;
    } catch (error) {
      console.log(error);
    }
  }
);

const UiReducer = createSlice({
  name: "ui",
  initialState,

  reducers: {
    updateTimerValue(state, action) {
      if (!action.payload) {
        return;
      }

      state.timerValue = action.payload;
    },
    updateCurrentSlotNo(state, action) {
      if (action.payload === undefined) {
        return;
      }
      state.currentSlotNo = action.payload;
    },

    updateCurrentQueNo(state, action) {
      if (action.payload === undefined) {
        return;
      }
      state.currentQueNo = action.payload;
    },
    updateAnsSelected(state, action) {
      state.ansSelected = action.payload;
    },
    updateQuizPointClaimStatus(state, action) {
      if (action.payload === undefined) {
        return;
      }
      state.isQuizPointsClaimed = action.payload;
    },
    updateTimerRunningStatus(state, action) {
      state.isTimerRunning = action.payload;
    },

    updateReferralCount(state, action) {
      state.referralCount = action.payload;
    },
    updateReferralPoints(state, action) {
      state.referralPoints = action.payload;
    },

    updateScreenLoaded(state, action) {
      state.screenLoaded = action.payload;
    },

    updateRefetch(state, action) {
      state.refetch = action.payload;
    },
    setSuccessPopup(state, action) {
      state.successPopup = action.payload;
    },
    updateIsExploding(state, action) {
      state.isExploding = action.payload;
    },
    updateQuizData(state, action) {
      state.quizzes = action.payload;
    },
    updaQuizLoadingStatus(state, action) {
      state.isQuizLoading = action.payload;
    },
    updateBackendSyncStatus(state, action) {
      state.isBackendSynced = action.payload;
    },
    updateDisplayData(state, action) {
      state.displayData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBackendDataToRedux.fulfilled, (state, action) => {
      const response = action.payload;
      console.log(response);
      if (response) {
        state.score = response.score;
        state.ansSelected = response.ansSelected;
        state.currentQueNo = response.currentQueNo;
        state.currentSlotNo = response.currentSlotNo;
        state.leagueLevel = response.leagueLevel;
        state.username = response.username;
        state.playLevels = response.playLevels;

        //Tasks states
        state.referralCount = response.referralCount;
        state.referralPoints = response.referralPoints;

        state.timerValue = response.timerValue;
        state.quizzes = response.quizzes;

        state.screenLoaded = true;
      }
    });

    builder.addCase(upgradeBoosterRedux.fulfilled, (state, action) => {
      const response = action.payload;
      if (response?.type === "rewards") {
        state.score = state.score - response.points;
        state.playLevels = {
          ...state.playLevels,
          rewards: state.playLevels.rewards + 1,
        };
      }
      if (response?.type === "timer") {
        state.score = state.score - response.points;
        state.playLevels = {
          ...state.playLevels,
          timer: state.playLevels.timer + 1,
        };
      }
    });
    builder.addCase(updateSelectedAnswerRedux.fulfilled, (state, action) => {
      const response = action.payload;
      if (response.points) {
        state.score = state.score + response.points;

        if (
          state.quizzes[state.currentQueNo].correct === response.inputOption
        ) {
          state.isExploding = true;
          setTimeout(() => {
            state.isExploding = false;
          }, 2000);
        }
      }
    });
  },
});

const { actions } = UiReducer;

export const {
  updateScore,
  updateTimerValue,
  updateCurrentSlotNo,
  updateCurrentQueNo,
  updateAnsSelected,
  updateQuizPointClaimStatus,
  updateTimerRunningStatus,
  updateReferralPoints,
  updateReferralCount,
  updateScreenLoaded,
  updateLeagueLevel,
  updateEnergyLeft,
  updatePlayLevels,
  setSuccessPopup,
  updateSpecialTaskStatusState,
  updateLeagueTaskStatusState,
  updateRefTaskStatusState,
  updateIsExploding,
  updateQuizData,
  updaQuizLoadingStatus,
  updateBackendSyncStatus,
  updateDisplayData,
  updateRefetch,
} = actions;

export default UiReducer;
