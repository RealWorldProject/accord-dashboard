import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPrivateFetch } from "../../utils/fetch";
import { FAILED, LOADING, SUCCESS } from "../../utils/status";
import { setSnackbar } from "./snackbar.slice";

export const getOrders = createAsyncThunk(
	"order/getOrder",
	async (_, { dispatch, rejectWithValue, getState }) => {
		try {
			const limit = 10;
			const page = 1;

			const privateFetch = getPrivateFetch(getState().user.token);
			const response = await privateFetch.get(
				`/api/v1/admin/orders?limit=${limit}&page=${page}`
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

const orderSlice = createSlice({
	name: "order",
	initialState: {
		data: [],
		totalCount: 0,
		page: 0,
		getStatus: "",
	},
	extraReducers: {
		[getOrders.pending]: (state, action) => {
			return { ...state, getStatus: LOADING };
		},
		[getOrders.fulfilled]: (state, { payload }) => {
			return {
				...state,
				getStatus: SUCCESS,
				data: payload.result,
				totalCount: payload.totalCount,
				page: payload.page,
			};
		},
		[getOrders.rejected]: (state, action) => {
			return { ...state, getStatus: FAILED };
		},
	},
});

export default orderSlice.reducer;
