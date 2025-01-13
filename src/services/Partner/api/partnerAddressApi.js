import axios from "axios";
import authHeader from "../../../shared/utils/authHeader";
import { APP_API } from "../../../shared/utils/apiConstants";

const getAllAddresses = () => {
	return axios.get(APP_API.PARTNER_ADDRESS, { headers: authHeader() });
};

const partnerAddressApi = {
	getAllAddresses,
};

export default partnerAddressApi;
