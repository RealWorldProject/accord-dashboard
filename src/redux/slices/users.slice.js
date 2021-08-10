import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setSnackbar } from "../../redux/slices/snackbar.slice";
import { getPrivateFetch } from "../../utils/fetch";
import { FAILED, LOADING, SUCCESS } from "../../utils/status";

export const getUsers = createAsyncThunk(
	"users/getUsers",
	async (_, { dispatch, rejectWithValue, getState }) => {
		try {
			const page = 1;
			const limit = 10;
			const privateFetch = getPrivateFetch(getState().user.token);
			const response = await privateFetch.get(
				`api/v1/users?page${page}&limit=${limit}`
			);
			return response.data;
		} catch (error) {
			console.log(error);
			const responseMessage = error.response.data.message;
			dispatch(
				setSnackbar({
					snackbarOpen: true,
					snackbarType: "error",
					snackbarMessage: responseMessage,
				})
			);
			return rejectWithValue(responseMessage);
		}
	}
);

export const suspendUsers = createAsyncThunk(
	"users/suspendUsers",
	async (user, { dispatch, rejectWithValue, getState }) => {
		try {
			const privateFetch = getPrivateFetch(getState().user.token);
			const response = await privateFetch.patch(
				`/api/v1/user/suspend/${user.id}`,
				{ suspensionMessage: user.rejectionMessage }
			);
			dispatch(
				setSnackbar({
					snackbarOpen: true,
					snackbarType: "success",
					snackbarMessage: response.data.message,
				})
			);
			return response.data;
		} catch (error) {
			console.log(error);
			const responseMessage = error.response.data.message;
			dispatch(
				setSnackbar({
					snackbarOpen: true,
					snackbarType: "error",
					snackbarMessage: responseMessage,
				})
			);
			return rejectWithValue(responseMessage);
		}
	}
);

const usersSlice = createSlice({
	name: "users",
	initialState: {
		data: [],
		totalCount: 0,
		page: 0,
		status: "",
		suspendStatus: "",
		message: "",
	},
	extraReducers: {
		[getUsers.pending]: (state, action) => {
			return { ...state, status: LOADING };
		},
		[getUsers.fulfilled]: (state, { payload }) => {
			return {
				...state,
				status: SUCCESS,
				data: payload.result,
				totalCount: payload.totalCount,
				page: payload.page,
			};
		},
		[getUsers.rejected]: (state, action) => {
			return { ...state, status: FAILED };
		},
		[suspendUsers.pending]: (state, action) => {
			return { ...state, suspendStatus: LOADING };
		},
		[suspendUsers.fulfilled]: (state, { payload }) => {
			const newUsers = state.data.map((user) => {
				if (user._id === payload.result._id) {
					const newUser = { ...user, isSuspended: true };
					return newUser;
				}
				return user;
			});
			return {
				...state,
				suspendStatus: SUCCESS,
				data: newUsers,
			};
		},
		[suspendUsers.rejected]: (state, action) => {
			return { ...state, suspendStatus: FAILED };
		},
	},
});

export default usersSlice.reducer;
