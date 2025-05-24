import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: null,
  user: null,
  venue: null,
  subVenues: [],
};

export const getUserInfo = createAsyncThunk(
  "user/getUserInfo",
  async (userId, thunkApi) => {
    try {
      const { data } = await axios(
        `${process.env.EXPO_PUBLIC_BACKEND_URL}/v1/users/getUserInfo?user_id=${userId}`
      );
      return data;
    } catch (error) {
      console.log(error, "slice");
      return thunkApi.rejectWithValue("Internal Error");
    }
  }
);

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.venue = null;
      state.subVenues = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const { user_info, venue_info, subvenue_info } = action.payload;
        state.user = user_info;
        state.venue = venue_info;
        state.subVenues = subvenue_info;
      })
      .addCase(getUserInfo.rejected, (state) => {
        state.loading = false;
        state.error = "Internal Error";
        state.user = null;
        state.venue = null;
        state.subVenues = [];
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
