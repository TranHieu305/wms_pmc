import axios from "axios";
import authHeader from "../../../shared/utils/authHeader";
import { APP_API } from "../../../shared/utils/apiConstants";

const getAllVehicles = () => {
	return axios.get(APP_API.VEHICLE, { headers: authHeader() });
};

const saveVehicle = (data) => {
	return axios.post(APP_API.VEHICLE, data, { headers: authHeader() });
};

const editVehicle = (data) => {
	return axios.put(APP_API.VEHICLE, data, { headers: authHeader() });
};

const deleteVehicle = (vehicle) => {
	return axios.delete(APP_API.VEHICLE + `/${vehicle.id}`, { headers: authHeader() });
};

const vehicleApi = {
	getAllVehicles,
	saveVehicle,
	editVehicle,
	deleteVehicle,
};

export default vehicleApi;
