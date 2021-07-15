import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userSlice from "./slices/user.slice";

const reducer = combineReducers({
	user: userSlice,
});

const store = configureStore({
	reducer,
});

export default store;
