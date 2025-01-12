import axios from "axios";
import { APP_API } from "../../../shared/utils/apiConstants";
import authHeader from "../../../shared/utils/authHeader";

const createFromBatchItem = (data) => {
	return axios.post(APP_API.PRODUCED_ITEM, data, { headers: authHeader() });
};

const getFromBatch = (batchId) => {
	return axios.get(APP_API.PRODUCED_ITEM + "/batch/" + batchId, { headers: authHeader() });
};

const approve = (itemId) => {
	return axios.patch(APP_API.PRODUCED_ITEM + `/${itemId}/approve`, null, {
		headers: authHeader(),
	});
};

const reject = (itemId) => {
	return axios.patch(APP_API.PRODUCED_ITEM + `/${itemId}/reject`, null, {
		headers: authHeader(),
	});
};

const producedItemApi = {
	createFromBatchItem,
	getFromBatch,
	approve,
	reject,
};

export default producedItemApi;
