import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: null,
  user: null,
  venue: null,
  subVenues: [],
  rooms: [],
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
      return thunkApi.rejectWithValue("Internal Error");
    }
  }
);

export const getRoomsInfo = createAsyncThunk(
  "user/getRoomsInfo",
  async (userId, thunkApi) => {
    try {
      const { data } = await axios(
        `${process.env.EXPO_PUBLIC_BACKEND_URL}/v1/users/getRoomsList?user_id=${userId}`
      );
      return data;
    } catch (error) {
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
      state.rooms = [];
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
        if (action.payload.status_code == 200) {
          const { user_info, venue_info, subvenue_info } = action.payload;
          state.error = null;
          state.user = user_info;
          state.venue = venue_info;
          state.subVenues = subvenue_info;
        } else {
          state.error = action.payload.message;
          state.user = null;
        }
      })
      .addCase(getUserInfo.rejected, (state) => {
        state.loading = false;
        state.error = "Internal Error";
        state.user = null;
        state.venue = null;
        state.subVenues = [];
      })
      .addCase(getRoomsInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRoomsInfo.fulfilled, (state, { payload }) => {
        state.loading = false;
        if (payload.status_code == 200) state.rooms = payload.rooms;
        else {
          state.rooms = [];
          state.error = payload.message;
        }
      })
      .addCase(getRoomsInfo.rejected, (state) => {
        state.loading = false;
        state.error = "Internal Error";
        state.rooms = [];
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
