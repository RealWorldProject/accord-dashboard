import { configureStore, combineReducers } from "@reduxjs/toolkit";
import categorySlice from "./slices/category.slice";
import userSlice from "./slices/user.slice";

const reducer = combineReducers({
	user: userSlice,
	category: categorySlice,
});

const store = configureStore({
	reducer,
});

export default store;
