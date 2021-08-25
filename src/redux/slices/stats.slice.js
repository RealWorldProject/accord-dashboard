import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPrivateFetch } from "../../utils/fetch";
import { FAILED, LOADING, SUCCESS } from "../../utils/status";
import { setSnackbar } from "./snackbar.slice";

export const getStats = createAsyncThunk(
	"order/getStats",
	async (_, { dispatch, rejectWithValue, getState }) => {
		try {
			const privateFetch = getPrivateFetch(getState().user.token);
			const response = await privateFetch.get(`/api/v1/stats`);
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

const statSlice = createSlice({
	name: "stats",
	initialState: {
		data: [],
		getStatus: "",
	},
	extraReducers: {
		[getStats.pending]: (state, action) => {
			return { ...state, getStatus: LOADING };
		},
		[getStats.fulfilled]: (state, { payload }) => {
			return {
				...state,
				getStatus: SUCCESS,
				data: payload.result,
			};
		},
		[getStats.rejected]: (state, action) => {
			return { ...state, getStatus: FAILED };
		},
	},
});

export default statSlice.reducer;
