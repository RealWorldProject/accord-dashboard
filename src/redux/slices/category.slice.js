import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { privateFetch } from "../../utils/fetch";

export const getCategories = createAsyncThunk(
	"category/getCategories",
	async () => {
		const response = await privateFetch.get(
			`/api/v1/categories?page=1&limit=10`
		);
		return response.data;
	}
);

export const addNewCategory = createAsyncThunk(
	"category/addNewCategory",
	async (newCategory) => {
		try {
			const imageResponse = await privateFetch.post("/api/v1/upload", {
				data: newCategory.image,
			});
			const image = imageResponse.data.url;
			const categoryResponse = await privateFetch.post(
				"/api/v1/category",
				{
					category: newCategory.category,
					slug: newCategory.slug,
					image,
				}
			);
			return categoryResponse.data;
		} catch (error) {
			return error.response.data;
		}
	}
);

const categorySlice = createSlice({
	name: "category",
	initialState: {
		data: [],
		totalCount: 0,
		page: 0,
		status: "",
		addStatus: "",
		message: "",
	},
	extraReducers: {
		[getCategories.pending]: (state, action) => {
			state.status = "LOADING";
		},
		[getCategories.fulfilled]: (state, { payload }) => {
			state.data = payload.result;
			state.totalCount = payload.total;
			state.page = payload.page;
			state.status = "SUCCESS";
		},
		[getCategories.rejected]: (state, action) => {
			state.status = "FAILED";
			console.log(action);
		},
		[addNewCategory.pending]: (state, action) => {
			state.addStatus = "LOADING";
		},
		[addNewCategory.fulfilled]: (state, { payload }) => {
			state.data = [...state.data, payload.result];
			state.totalCount += 1;
			state.addStatus = "SUCCESS";
		},
		[addNewCategory.rejected]: (state, action) => {
			state.addStatus = "FAILED";
			console.log(action);
		},
	},
});

export default categorySlice.reducer;
