import { AUTH_API } from "../../../shared/utils/apiConstants";
import axios from "axios";

const login = async (email, password) => {
	try {
		const response = await axios.post(AUTH_API.LOGIN, { email, password });
		// Set token in localStorage
		if (response.data.data.accessToken) {
			localStorage.setItem("user", JSON.stringify(response.data.data));
		}
		// Return the response data
		return response.data;
	} catch (error) {
		// Throw error for the caller to handle
		throw new Error(error.message || "Login failed");
	}
};

const logout = () => {
	localStorage.removeItem("user");
};

const authApi = {
	login,
	logout,
};

export default authApi;
