// frontend\src\features\interview\interviewSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import interviewService from './interviewService';

const initialState = {
  currentQuestion: null,
  currentFeedback: null,
  interviewHistory: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
};

// Start a new interview
export const startInterview = createAsyncThunk(
  'interview/start',
  async (interviewData, thunkAPI) => {
    try {
      return await interviewService.startInterview(interviewData);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Submit an answer
export const submitAnswer = createAsyncThunk(
  'interview/submit',
  async (answerData, thunkAPI) => {
    try {
      return await interviewService.submitAnswer(answerData);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get interview history
export const getInterviewHistory = createAsyncThunk(
  'interview/getHistory',
  async (_, thunkAPI) => {
    try {
      return await interviewService.getInterviewHistory();
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const interviewSlice = createSlice({
  name: 'interview',
  initialState,
  reducers: {
    resetInterviewState: (state) => {
      state.currentQuestion = null;
      state.currentFeedback = null;
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
    clearHistory: (state) => {
      state.interviewHistory = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(startInterview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(startInterview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.currentQuestion = action.payload.question;
        state.currentFeedback = null;
      })
      .addCase(startInterview.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(submitAnswer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(submitAnswer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.currentFeedback = action.payload.feedback;
      })
      .addCase(submitAnswer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getInterviewHistory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getInterviewHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.interviewHistory = action.payload.data;
      })
      .addCase(getInterviewHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetInterviewState, clearHistory } = interviewSlice.actions;
export default interviewSlice.reducer;