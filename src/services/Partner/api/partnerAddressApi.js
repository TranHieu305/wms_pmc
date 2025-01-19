import axios from "axios";
import authHeader from "../../../shared/utils/authHeader";
import { APP_API } from "../../../shared/utils/apiConstants";

const getAllAddresses = () => {
	return axios.get(APP_API.PARTNER_ADDRESS, { headers: authHeader() });
};

const saveAddress = (data) => {
	return axios.post(APP_API.PARTNER_ADDRESS, data, { headers: authHeader() });
};

const editAddress = (data) => {
	return axios.put(APP_API.PARTNER_ADDRESS, data, { headers: authHeader() });
};

const deleteAddress = (address) => {
	return axios.delete(APP_API.PARTNER_ADDRESS + `/${address.id}`, { headers: authHeader() });
};

const partnerAddressApi = {
	getAllAddresses,
	saveAddress,
	editAddress,
	deleteAddress,
};

export default partnerAddressApi;
