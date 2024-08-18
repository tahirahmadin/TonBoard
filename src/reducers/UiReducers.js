import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAllProjects,
  getUserBackendData,
  updateAnswerToBackend,
  updateTasksStatusToBackend,
} from "../actions/serverActions";

const initialState = {
  score: 0,
  quizzes: [],
  projects: [],
  workCompleted: [],
  nextQueNo: 0,
  isExploding: false,
  isNextButtonEnabled: false,
  timerValue: 0,
  username: null,

  isQuizLoading: false,
  quizPoints: 0,
  referralPoints: 0,
  workPoints: 0,
  currentSlotNo: 0,

  ansSelected: [],
  isTimerRunning: false,

  refetch: 0,
  successPopup: false,
  screenLoaded: false,
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

// Function:: get Projects Data
export const getProjectsDataToRedux = createAsyncThunk(
  "getProjectsDataToRedux",
  async () => {
    try {
      let response = await getAllProjects();
      if (response) {
        return response;
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

      const response = await updateAnswerToBackend(dataObj);

      console.log("response");
      console.log(response);

      if (response) {
        return response;
      }
      return null;
    } catch (error) {
      console.log(error);
    }
  }
);

// Function: To mark task completed
export const updateTaskCompleteStatus = createAsyncThunk(
  "updateTaskCompleteStatus",
  async (dataObj) => {
    try {
      // Update answers array

      const response = await updateTasksStatusToBackend(dataObj);

      console.log("response");
      console.log(response);

      if (response) {
        return response;
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
    updateNextQueNo(state, action) {
      state.currentQueNo = state.nextQueNo;
      state.isNextButtonEnabled = false;
      state.isExploding = false;
    },
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

    updateTimerRunningStatus(state, action) {
      state.isTimerRunning = action.payload;
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

    updateQuizLoadingStatus(state, action) {
      state.isQuizLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBackendDataToRedux.fulfilled, (state, action) => {
      const response = action.payload;

      if (response) {
        state.score = response.score;
        state.workCompleted = response.workCompleted;
        state.quizzes = response.quizzes;
        state.currentSlotNo = response.currentSlotNo;
        state.currentQueNo = response.currentQueNo;
        state.nextQueNo = response.currentQueNo;

        state.ansSelected = response.ansSelected;

        state.leagueLevel = response.leagueLevel;
        state.username = response.username;
        state.playLevels = response.playLevels;

        //Tasks states

        state.referralPoints = response.referralPoints;

        state.timerValue = response.timerValue;

        state.screenLoaded = true;
      }
    });
    builder.addCase(getProjectsDataToRedux.fulfilled, (state, action) => {
      const response = action.payload;

      if (response) {
        state.projects = response;
      }
    });

    builder.addCase(updateSelectedAnswerRedux.fulfilled, (state, action) => {
      const response = action.payload;
      if (response.user) {
        let userObj = response.user;
        state.score = userObj.score;
        state.ansSelected = userObj.ansSelected;
        state.nextQueNo = userObj.currentQueNo;
        state.currentSlotNo = userObj.currentSlotNo;
        state.isExploding = response.isCorrect;
        state.timerValue = response.timerValue;
        state.isNextButtonEnabled = true;
      }
    });
    builder.addCase(updateTaskCompleteStatus.fulfilled, (state, action) => {
      const response = action.payload;
      console.log(response);
      if (response) {
        state.workCompleted = response.workCompleted;
      }
    });
  },
});

const { actions } = UiReducer;

export const {
  updateNextQueNo,
  updateScore,
  updateTimerValue,
  updateCurrentSlotNo,
  updateCurrentQueNo,
  updateTimerRunningStatus,
  updateReferralPoints,
  updateScreenLoaded,
  setSuccessPopup,
  updateRefetch,
  updateQuizLoadingStatus,
} = actions;

export default UiReducer;
