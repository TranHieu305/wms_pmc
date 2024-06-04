import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { PRODUCT_PRICE_API_ENDPOINT } from "../../utils/constants/apiEndpoint";

const initialState = { productPrices: [], loading: false, error: "" };

export const fetchProductPrices = createAsyncThunk("productPrice/fetchInit", () => {
	return axios
		.get(PRODUCT_PRICE_API_ENDPOINT + "/current-prices")
		.then((response) => response.data);
});

const productPriceSlice = createSlice({
	name: "productPrice",
	initialState,
	extraReducers: (builder) => {
		builder.addCase(fetchProductPrices.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(fetchProductPrices.fulfilled, (state, action) => {
			state.loading = false;
			state.productPrices = action.payload.data;
			state.error = "";
		});
		builder.addCase(fetchProductPrices.rejected, (state, action) => {
			state.loading = false;
			state.productPrices = [];
			state.error = action.error.message;
		});
	},
	reducers: {},
});

export const productPriceActions = productPriceSlice.actions;
export default productPriceSlice.reducer;
