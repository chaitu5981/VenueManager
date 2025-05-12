import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: null,
  user: null,
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, thunkApi) => {
    try {
      const { data } = await axios.post(
        "https://vm-backend-6fd25b5f6201.herokuapp.com/v1/users/registration",
        userData
      );
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue("Internal error");
    }
  }
);
export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, thunkApi) => {
    try {
      const { data } = await axios.post(
        "https://vm-backend-6fd25b5f6201.herokuapp.com/v1/users/login",
        userData
      );
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue("Internal Error");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state, action) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        const { message, ...rest } = action.payload.data;
        state.user = rest;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.user = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload.data.message;
      });
  },
});

export default authSlice.reducer;
