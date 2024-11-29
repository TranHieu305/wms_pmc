import { AUTH_API } from "../../../shared/utils/apiConstants";
import axios from "axios";

const login = (email, password) => {
	return axios
		.post(AUTH_API.LOGIN, {
			email,
			password,
		})
		.then((response) => {
			// Set token localStorage
			if (response.data.data.accessToken) {
				localStorage.setItem("user", JSON.stringify(response.data.data));
			}
			return response.data;
		})
		.catch((err) => {
			throw err.message;
		});
};

const authApi = {
	login,
};

export default authApi;
