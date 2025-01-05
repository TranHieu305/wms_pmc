import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userApi from "../../services/User/api/userApi";

// Async thunk to fetch all users
export const fetchAllUsers = createAsyncThunk("users/fetchAll", async () => {
	const response = await userApi.getAllUserGeneral();
	if (!response.status === 200) {
		throw new Error("Failed to fetch users");
	}
	return response.data.data;
});

const userSlice = createSlice({
	name: "users",
	initialState: {
		userList: [], // Cached users
		status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchAllUsers.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchAllUsers.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.userList = action.payload; // Cache users in Redux
			})
			.addCase(fetchAllUsers.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	},
});

export default userSlice.reducer;
