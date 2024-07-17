import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  score: 550000,
  tapScore: 0,
  leagueLevel: 0,
  energyLeft: 0,
  screenLoaded: false,
  multiTapFlag: false,
  lastUpdatedAt: Date.now(),
  multiTapStamp: [],
  fullHungerStamp: [],
  specialTasksStatus: [],
  leagueTasksStatus: [],
  refTasksStatus: [],

  playLevels: {
    tap: 0,
    energy: 0,
    recharge: 0,
  },
  playValues: {
    tap: 0,
    energy: 0,
    recharge: 0,
  },
  refetch: 0,
  successPopup: false,
  referralCount: 0,
  referralPoints: 0,
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
    updateTapScore(state, action) {
      state.tapScore = action.payload;
    },

    updateReferralCount(state, action) {
      state.referralCount = action.payload;
    },
    updateReferralPoints(state, action) {
      state.referralPoints = action.payload;
    },
    updateFullHungerStamp(state, action) {
      state.fullHungerStamp = action.payload;
    },
    updateMultiTapStamp(state, action) {
      state.multiTapStamp = action.payload;
    },
    updateScreenLoaded(state, action) {
      state.screenLoaded = action.payload;
    },
    updateMultiTap(state, action) {
      state.multiTapFlag = action.payload;
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
      state.energyLeft = action.payload;
    },
    updatePlayLevels(state, action) {
      state.playLevels = action.payload;
    },
    updatePlayValues(state, action) {
      state.playValues = action.payload;
    },
    updateRefetch(state, action) {
      state.refetch = action.payload;
    },
    setSuccessPopup(state, action) {
      state.successPopup = action.payload;
    },
    // Booster Function
    buyNewBooster(state, action) {
      state.refetch = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateLocalDataToRedux.fulfilled, (state, action) => {
      const response = action.payload;
      if (response) {
        state.score = response.score;
        state.tapScore = response.tapScore;
        state.leagueLevel = response.leagueLevel;

        state.multiTapFlag = response.multiTapFlag;
        state.multiTapStamp = response.multiTapStamp;
        state.fullHungerStamp = response.fullHungerStamp;

        state.energyLeft = response.energyLeft;
        state.playLevels = response.playLevels;
        state.playValues = response.playValues;

        //Tasks states
        state.specialTasksStatus = response.specialTasksStatus;
        state.leagueTasksStatus = response.leagueTasksStatus;
        state.refTasksStatus = response.refTasksStatus;

        state.initialLoaded = true;
      }
    });
    builder.addCase(updateBackendToRedux.fulfilled, (state, action) => {
      const response = action.payload;
      if (response) {
        state.score = response.score;
        state.tapScore = response.tapScore;
        state.leagueLevel = response.leagueLevel;
        state.energyLeft = response.energyLeft;
        state.playLevels = response.playLevels;
        state.multiTapFlag = response.multiTapFlag;
        state.multiTapStamp = response.multiTapStamp;
        state.referralCount = response.referralCount;
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
  updateTapScore,
  updateReferralPoints,
  updateReferralCount,
  updateScreenLoaded,
  updateMultiTap,
  updateLeagueLevel,
  updateEnergyLeft,
  updatePlayLevels,
  updatePlayValues,
  setSuccessPopup,
  updateFullHungerStamp,
  updateMultiTapStamp,
  updateSpecialTaskStatusState,
  updateLeagueTaskStatusState,
  updateRefTaskStatusState,
} = actions;

export default UiReducer;
