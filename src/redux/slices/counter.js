import { createSlice } from "@reduxjs/toolkit";

const initialState = { counter: 0, showCounter: true };

const counterSlice = createSlice({
	name: "counter",
	initialState,
	reducers: {
		incerement(state, action) {},
		decrement() {},
	},
});

export const counterActions = counterSlice.actions;
export default counterSlice.reducer;
