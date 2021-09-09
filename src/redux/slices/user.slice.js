import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
	name: "user",
	initialState: {
		token: localStorage.getItem("token") || "",
		user: JSON.parse(localStorage.getItem("user")) || {},
	},
	reducers: {
		setToken: (state, action) => {
			return { ...state, token: action.payload };
		},
		removeToken: (state, action) => {
			localStorage.removeItem("token");
			return { user: {}, token: "" };
		},
		setUser: (state, action) => {
			console.log(action.payload);
			localStorage.setItem("user", JSON.stringify(action.payload));
			return { ...state, user: action.payload };
		},
	},
});

export const { setToken, removeToken, setUser } = userSlice.actions;

export default userSlice.reducer;
