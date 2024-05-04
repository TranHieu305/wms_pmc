import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { PRODUCT_CATEGORY_API_ENDPOINT } from "../../apis/config";

const initialState = { productCategories: [], loading: false, error: "" };

export const fetchProductCategories = createAsyncThunk("productCategory/fetchCategories", () => {
	return axios.get(PRODUCT_CATEGORY_API_ENDPOINT).then((response) => response.data);
});

const productCategorySlice = createSlice({
	name: "product-category",
	initialState,
	extraReducers: (builder) => {
		builder.addCase(fetchProductCategories.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(fetchProductCategories.fulfilled, (state, action) => {
			state.loading = false;
			state.productCategories = action.payload.data;
			state.error = "";
		});
		builder.addCase(fetchProductCategories.rejected, (state, action) => {
			state.loading = false;
			state.productCategories = [];
			state.error = action.error.message;
		});
	},
	reducers: {},
});

export default productCategorySlice.reducer;
