import axios from "axios";
import { APP_API } from "../../../shared/utils/apiConstants";
import authHeader from "../../../shared/utils/authHeader";

const updateItem = (data) => {
	return axios.patch(APP_API.BATCH_ITEM, data, { headers: authHeader() });
};

const deleteItem = (item) => {
	return axios.delete(APP_API.BATCH_ITEM + `/${item.id}`, { headers: authHeader() });
};

const markAsCompleted = (batchId, itemId) => {
	return axios.patch(
		APP_API.BATCH_ITEM + `/batch/${batchId}/item/${itemId}/status/completed`,
		null,
		{ headers: authHeader() }
	);
};

const batchItemApi = {
	updateItem,
	deleteItem,
	markAsCompleted,
};

export default batchItemApi;
