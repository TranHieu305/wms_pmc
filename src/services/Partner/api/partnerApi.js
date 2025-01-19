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

const deletePartner = (partner) => {
	return axios.delete(PARTNER_API.BASE + `/${partner.id}`, { headers: authHeader() });
};

const getPartnerDetail = (partnerId) => {
	return axios.get(PARTNER_API.BASE + `/${partnerId}`, { headers: authHeader() });
};

const partnerApi = {
	getAllPartners,
	savePartner,
	editPartner,
	deletePartner,
	getPartnerDetail,
};

export default partnerApi;
