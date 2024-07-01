import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userSlice from "./userSlice";

const reducers = combineReducers({
    user: userSlice.reducer,   
})

const store = configureStore({
    reducer: reducers
})

export default store; 