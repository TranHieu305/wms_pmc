import axios from "axios";
import { PARTNER_API } from "../../../shared/utils/apiConstants";
import authHeader from "../../../shared/utils/authHeader";

const getAllPartners = () => {
	return axios.get(PARTNER_API.GET_ALL, { headers: authHeader() });
};

const partnerApi = {
	getAllPartners,
};

export default partnerApi;
