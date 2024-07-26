import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  quizzes: [],
  isQuizLoading: false,
  score: 0,
  quizPoints: 0,
  refferalPoints: 0,
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
  referralCount: 0,
  referralPoints: 0,

  specialTasksStatus: [],
  leagueTasksStatus: [],
  refTasksStatus: [],
  screenLoaded: false,
  nextButtonFlag: false,
  timerValue: 0,
  isExploding: false,
};

// Function:: update localData to redux
export const updateLocalDataToRedux = createAsyncThunk(
  "updateLocalDataToRedux",
  async () => {
    try {
      let tempLocalStorageData = localStorage.getItem("ui");
      if (tempLocalStorageData) {
        return JSON.parse(tempLocalStorageData);
      }
      return tempLocalStorageData;
    } catch (error) {
      console.log(error);
    }
  }
);

/// Function:: update backendData to local
export const updateBackendToRedux = createAsyncThunk(
  "updateBackendToRedux",
  async (backendDataObj) => {
    try {
      return backendDataObj;
    } catch (error) {
      console.log(error);
    }
  }
);

const UiReducer = createSlice({
  name: "ui",
  initialState,

  reducers: {
    updateScore(state, action) {
      state.score = action.payload;
    },
    updateNextButtonFlag(state, action) {
      state.nextButtonFlag = action.payload;
    },
    updateTimerValue(state, action) {
      state.timerValue = action.payload;
    },
    updateCurrentSlotNo(state, action) {
      console.log("updating slot number", {
        old: state.currentSlotNo,
        new: action.payload,
      });
      state.currentSlotNo = action.payload;
    },

    updateCurrentQueNo(state, action) {
      state.currentQueNo = action.payload;
    },
    updateAnsSelected(state, action) {
      state.ansSelected = action.payload;
    },
    updateQuizPointClaimStatus(state, action) {
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

    updateSpecialTaskStatusState(state, action) {
      state.specialTasksStatus = action.payload;
    },
    updateLeagueTaskStatusState(state, action) {
      state.leagueTasksStatus = action.payload;
    },
    updateRefTaskStatusState(state, action) {
      state.refTasksStatus = action.payload;
    },
    updateLeagueLevel(state, action) {
      state.leagueLevel = action.payload;
    },
    updateEnergyLeft(state, action) {
      state.queLeft = action.payload;
    },
    updatePlayLevels(state, action) {
      state.playLevels = action.payload;
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
  },
  extraReducers: (builder) => {
    builder.addCase(updateLocalDataToRedux.fulfilled, (state, action) => {
      const response = action.payload;
      if (response) {
        state.score = response.score;
        state.nextButtonFlag = response.nextButtonFlag;
        state.ansSelected = response.ansSelected;
        state.currentQueNo = response.currentQueNo;
        state.currentSlotNo = response.currentSlotNo;
        state.leagueLevel = response.leagueLevel;

        state.leagueTasksStatus = response.leagueTasksStatus;

        state.queLeft = response.queLeft;
        state.playLevels = response.playLevels;

        //Tasks states
        state.specialTasksStatus = response.specialTasksStatus;
        state.leagueTasksStatus = response.leagueTasksStatus;
        state.refTasksStatus = response.refTasksStatus;
        state.referralCount = response.referralCount;
        state.referralPoints = response.referralPoints;

        state.specialTasksStatus = response.specialTasksStatus;

        state.screenLoaded = true;
        state.timerValue = response.timerValue;
        state.isQuizPointsClaimed = response.isQuizPointsClaimed;
        state.isTimerRunning = response.isTimerRunning;
        state.quizzes = response.quizzes;
        state.isQuizLoading = response.isQuizLoading;
      }
    });
    builder.addCase(updateBackendToRedux.fulfilled, (state, action) => {
      const response = action.payload;
      if (response) {
        state.score = response.score;
        state.nextButtonFlag = response.nextButtonFlag;
        state.ansSelected = response.ansSelected;
        state.currentQueNo = response.currentQueNo;
        state.currentSlotNo = response.currentSlotNo;
        state.leagueLevel = response.leagueLevel;

        state.leagueTasksStatus = response.leagueTasksStatus;

        state.queLeft = response.queLeft;
        state.playLevels = response.playLevels;

        //Tasks states
        state.specialTasksStatus = response.specialTasksStatus;
        state.leagueTasksStatus = response.leagueTasksStatus;
        state.refTasksStatus = response.refTasksStatus;
        state.referralCount = response.referralCount;
        state.referralPoints = response.referralPoints;

        state.specialTasksStatus = response.specialTasksStatus;

        state.screenLoaded = true;
        state.timerValue = response.timerValue;
        state.isQuizPointsClaimed = response.isQuizPointsClaimed;
        state.isTimerRunning = response.isTimerRunning;
      }
    });
  },
});

const { actions } = UiReducer;

export const {
  updateScore,
  updateNextButtonFlag,
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
} = actions;

export default UiReducer;
