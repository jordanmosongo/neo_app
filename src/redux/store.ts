import { configureStore } from "@reduxjs/toolkit";
import UserReducers from "./reducers/UserReducers";


const store = configureStore({
  reducer: {
    user: UserReducers
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
