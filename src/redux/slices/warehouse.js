import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { WAREHOUSE_API_ENDPOINT } from "../../utils/constants";

const initialState = { warehouses: [], loading: false, error: "" };

export const fetchWarehouses = createAsyncThunk("warehouse/fetchInit", () => {
	return axios.get(WAREHOUSE_API_ENDPOINT).then((response) => response.data);
});

const warehouseSlice = createSlice({
	name: "warehouse",
	initialState,
	extraReducers: (builder) => {
		builder.addCase(fetchWarehouses.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(fetchWarehouses.fulfilled, (state, action) => {
			state.loading = false;
			state.warehouses = action.payload.data;
			state.error = "";
		});
		builder.addCase(fetchWarehouses.rejected, (state, action) => {
			state.loading = false;
			state.warehouses = [];
			state.error = action.error.message;
		});
	},
	reducers: {},
});

export const warehouseActions = warehouseSlice.actions;
export default warehouseSlice.reducer;
