import { configureStore } from "@reduxjs/toolkit";
import locationReducer from "./locationSlice";
import userReducer from "./userSlice";
import { devToolsEnhancer } from "@redux-devtools/extension";

const store = configureStore({
  reducer: {
    location: locationReducer,
    user: userReducer,
  },
  // enhancers: (existingEnhancers) => [devToolsEnhancer(), ...existingEnhancers],

  devTools: true,
});

export default store;
