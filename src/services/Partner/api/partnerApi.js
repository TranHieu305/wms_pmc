import axios from "axios";
import { PARTNER_API } from "../../../shared/utils/apiConstants";
import authHeader from "../../../shared/utils/authHeader";

const getAllPartners = () => {
	return axios.get(PARTNER_API.BASE, { headers: authHeader() });
};

const savePartner = (data) => {
	return axios.post(PARTNER_API.BASE, data, { headers: authHeader() });
};

const editPartner = (data) => {
	return axios.put(PARTNER_API.BASE, data, { headers: authHeader() });
};

const partnerApi = {
	getAllPartners,
	savePartner,
	editPartner,
};

export default partnerApi;
