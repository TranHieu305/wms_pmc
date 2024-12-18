import axios from "axios";
import { APP_API } from "../../../shared/utils/apiConstants";
import authHeader from "../../../shared/utils/authHeader";

const getAllBatches = () => {
	return axios.get(APP_API.BATCH, { headers: authHeader() });
};

const createFromOrder = (data) => {
	return axios.post(APP_API.BATCH, data, { headers: authHeader() });
};

const getBatchDetail = (batchId) => {
	return axios.get(APP_API.BATCH + `/${batchId}`, { headers: authHeader() });
};

const markAsDelivered = (batchId) => {
	return axios.patch(APP_API.BATCH + `/${batchId}/status/delivered`, null, {
		headers: authHeader(),
	});
};

const batchApi = {
	getAllBatches,
	createFromOrder,
	getBatchDetail,
	markAsDelivered,
};

export default batchApi;
