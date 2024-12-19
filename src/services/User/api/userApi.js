import axios from "axios";
import authHeader from "../../../shared/utils/authHeader";
import { APP_API } from "../../../shared/utils/apiConstants";

const createUser = (data) => {
	return axios.post(APP_API.USER, data, { headers: authHeader() });
};

const getAllUserrs = () => {
	return axios.get(APP_API.USER, { headers: authHeader() });
};

const deleteUser = (user) => {
	return axios.delete(APP_API.USER + `/${user.id}`, { headers: authHeader() });
};

const updateUser = (data) => {
	return axios.put(APP_API.USER, data, { headers: authHeader() });
};

const userApi = {
	createUser,
	getAllUserrs,
	deleteUser,
	updateUser,
};

export default userApi;
