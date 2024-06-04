import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { PRODUCT_API_ENDPOINT } from "../../utils/constants";

const initialState = { products: [], loading: false, error: "" };

export const fetchProducts = createAsyncThunk("product/fetchInit", () => {
	return axios.get(PRODUCT_API_ENDPOINT).then((response) => response.data);
});

const productSlice = createSlice({
	name: "product",
	initialState,
	extraReducers: (builder) => {
		builder.addCase(fetchProducts.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(fetchProducts.fulfilled, (state, action) => {
			state.loading = false;
			state.products = action.payload.data;
			state.error = "";
		});
		builder.addCase(fetchProducts.rejected, (state, action) => {
			state.loading = false;
			state.products = [];
			state.error = action.error.message;
		});
	},
	reducers: {},
});

export const productActions = productSlice.actions;
export default productSlice.reducer;
