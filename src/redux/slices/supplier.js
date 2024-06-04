import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { SUPPLIER_API_ENDPOINT } from "../../utils/constants";

const initialState = { suppliers: [], loading: false, error: "" };

export const fetchSuppliers = createAsyncThunk("supplier/fetchInit", () => {
	return axios.get(SUPPLIER_API_ENDPOINT).then((response) => response.data);
});

const supplierSlice = createSlice({
	name: "supplier",
	initialState,
	extraReducers: (builder) => {
		builder.addCase(fetchSuppliers.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(fetchSuppliers.fulfilled, (state, action) => {
			state.loading = false;
			state.suppliers = action.payload.data;
			state.error = "";
		});
		builder.addCase(fetchSuppliers.rejected, (state, action) => {
			state.loading = false;
			state.suppliers = [];
			state.error = action.error.message;
		});
	},
	reducers: {},
});

export const supplierActions = supplierSlice.actions;
export default supplierSlice.reducer;
