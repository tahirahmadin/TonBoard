import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  score: 0,
  tapScore: 0,
  screenLoaded: false,
  multiTapFlag: false,
  lastUpdatedAt: Date.now(),
  multiTapStamp: [],
  fullHungerStamp: [],
  leagueLevel: 0,
  energyLeft: 0,
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
};

// Database -  user Leader data from database
export const getLocalDataSyncWithRedux = createAsyncThunk(
  "getLocalDataSyncWithRedux",
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
    builder.addCase(getLocalDataSyncWithRedux.fulfilled, (state, action) => {
      const response = action.payload;
      if (response) {
        state.score = response.score;
        state.tapScore = response.tapScore;
        state.multiTapFlag = response.multiTapFlag;
        state.multiTapStamp = response.multiTapStamp;
        state.fullHungerStamp = response.fullHungerStamp;
        state.leagueLevel = response.leagueLevel;
        state.energyLeft = response.energyLeft;
        state.playLevels = response.playLevels;
        state.playValues = response.playValues;
      }
    });
  },
});

const { actions } = UiReducer;

export const {
  updateScore,
  updateTapScore,
  updateScreenLoaded,
  updateMultiTap,
  updateLeagueLevel,
  updateEnergyLeft,
  updatePlayLevels,
  updatePlayValues,
  setSuccessPopup,
  updateFullHungerStamp,
  updateMultiTapStamp,
} = actions;

export default UiReducer;
