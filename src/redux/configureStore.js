import { configureStore, combineReducers } from "@reduxjs/toolkit";
import categorySlice from "./slices/category.slice";
import snackbarSlice from "./slices/snackbar.slice";
import userSlice from "./slices/user.slice";

const reducer = combineReducers({
	user: userSlice,
	category: categorySlice,
	snackbar: snackbarSlice,
});

const store = configureStore({
	reducer,
});

export default store;
