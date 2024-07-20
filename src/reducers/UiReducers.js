import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  score: 550000,
  leagueLevel: 0,
  currentSlotNo: 0,
  currentQueNo: 0,
  ansSelected: [],

  playLevels: {
    timer: 0,
    rewards: 0,
  },
  refetch: 0,
  successPopup: false,
  referralCount: 0,
  referralPoints: 0,

  specialTasksStatus: [],
  leagueTasksStatus: [],
  refTasksStatus: [],
  screenLoaded: false,
};

// Function:: update localData to redux
export const updateLocalDataToRedux = createAsyncThunk(
  "updateLocalDataToRedux",
  async () => {
    try {
      let tempLocalStorageData = await localStorage.getItem("ui");
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

    updateCurrentSlotNo(state, action) {
      state.currentSlotNo = action.payload;
    },
    updateCurrentQueNo(state, action) {
      state.currentQueNo = action.payload;
    },
    updateAnsSelected(state, action) {
      state.ansSelected = action.payload;
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
  },
  extraReducers: (builder) => {
    builder.addCase(updateLocalDataToRedux.fulfilled, (state, action) => {
      const response = action.payload;
      if (response) {
        state.score = response.score;
        state.ansSelected = response.ansSelected;
        state.currentQueNo = response.currentQueNo;
        state.leagueLevel = response.leagueLevel;

        state.queLeft = response.queLeft;
        state.playLevels = response.playLevels;

        //Tasks states
        state.specialTasksStatus = response.specialTasksStatus;
        state.leagueTasksStatus = response.leagueTasksStatus;
        state.refTasksStatus = response.refTasksStatus;
        state.screenLoaded = true;
      }
    });
    builder.addCase(updateBackendToRedux.fulfilled, (state, action) => {
      const response = action.payload;
      if (response) {
        state.score = response.score;
        state.ansSelected = response.ansSelected;
        state.currentQueNo = response.currentQueNo;
        state.leagueLevel = response.leagueLevel;
        state.queLeft = response.queLeft;
        state.playLevels = response.playLevels;

        //Tasks states
        state.specialTasksStatus = response.specialTasksStatus;
        state.leagueTasksStatus = response.leagueTasksStatus;
        state.refTasksStatus = response.refTasksStatus;
      }
    });
  },
});

const { actions } = UiReducer;

export const {
  updateScore,
  updateCurrentSlotNo,
  updateCurrentQueNo,
  updateAnsSelected,
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
} = actions;

export default UiReducer;
