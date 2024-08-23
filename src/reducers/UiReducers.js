import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getQuizData,
  getUserBackendData,
  markQuizAnswer,
  updateDataToBackendAPI,
  upgradeBoosterToBackend,
} from "../actions/serverActions";

const initialState = {
  score: 0,
  questionData: {},
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

export const updateCurrentQuestion = createAsyncThunk(
  "updateCurrentQuestion",
  async (userId) => {
    try {
      let response = await getQuizData(userId);

      if (response) {
        return response;
      }
      return null;
    } catch (error) {
      console.log("updateCurrentQuestion", error);
      return {};
    }
  }
);

// Function: To upgrade booster
export const upgradeBoosterRedux = createAsyncThunk(
  "upgradeBoosterRedux",
  async (dataObj) => {
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

// // Function: To mark answer to backend
// export const updateSelectedAnswerRedux = createAsyncThunk(
//   "updateSelectedAnswerRedux",
//   async (reqBody) => {
//     try {
//       // console.log("dataObj");
//       // console.log(dataObj);

//       // //Update answers array

//       // const response = await updateDataToBackendAPI({
//       //   userId: dataObj.userId,
//       //   inputOption: dataObj.inputOption,
//       // });

//       // console.log("response");
//       // console.log(response);

//       // if (response.error === false) {
//       //   return {
//       //     inputOption: dataObj.inputOption,
//       //     points: response.result.points,
//       //     correctOption: response.result.correctOption,
//       //   };
//       // }
//       const response = await markQuizAnswer(reqBody);
//       if (response) {
//         return response;
//       }
//       return {};
//     } catch (error) {
//       console.log(error);
//       return {};
//     }
//   }
// );

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
    updateBackendSyncStatus(state, action) {
      state.isBackendSynced = action.payload;
    },
    updateDisplayData(state, action) {
      state.displayData = action.payload;
    },
    updateOnQuizResult(state, action) {
      const response = action.payload;

      console.log("question answer response ", response);
      // handle error state if anything goes wrong
      if (response.error || !response.result) {
        return;
      }

      state.score = state.score + response.result.reward;
      state.ansSelected = response?.result?.user?.ansSelected;
      state.currentQueNo = response?.result?.user?.currentQueNo;
      state.currentSlotNo = response.result.user.currentSlotNo;

      state.questionData = {
        ...state.questionData,
        question: {
          ...state.questionData.question,
          correct: response.result.correct,
        },
      };
    },
    updateQuestion(state, action) {
      const response = action.payload;
      console.log("updateCurrentQuestion response ", response);
      // handle error state if anything goes wrong
      if (response.error) {
        state.questionData = {};
        return;
      }

      state.questionData = response.result;
      state.timerValue = response.result.timerValue;
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

    builder.addCase(updateCurrentQuestion.fulfilled, (state, action) => {
      const response = action.payload;
      console.log("updateCurrentQuestion response ", response);
      // handle error state if anything goes wrong
      if (response.error) {
        state.questionData = {};
        return;
      }

      state.questionData = response.result;
    });

    builder.addCase(upgradeBoosterRedux.fulfilled, (state, action) => {
      const response = action.payload;

      if (response) {
        state.projects = response;
      }
    });
    // builder.addCase(updateSelectedAnswerRedux.fulfilled, (state, action) => {
    //   const response = action.payload;

    //   console.log("question answer response ", response);
    //   // handle error state if anything goes wrong
    //   if (response.error || !response.result) {
    //     return;
    //   }

    //   state.score = state.score + response.result.reward;
    //   state.ansSelected = response?.result?.user?.ansSelected;
    //   state.currentQueNo = response?.result?.user?.currentQueNo;
    //   state.currentSlotNo = response.result.user.currentSlotNo;

    //   state.questionData = {
    //     ...state.questionData,
    //     question: {
    //       ...state.questionData.question,
    //       correct: response.result.correct,
    //     },
    //   };

    //   // if (response?.result?.isCorrect) {
    //   //   state.isExploding = true;
    //   //   setTimeout(() => {
    //   //     state.isExploding = false;
    //   //   }, 2000);
    //   // }
    // });
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
  updateOnQuizResult,
  updateQuestion,
} = actions;

export default UiReducer;
