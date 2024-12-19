import axios from "axios";
import { APP_API } from "../../../shared/utils/apiConstants";
import authHeader from "../../../shared/utils/authHeader";

const updateItem = (data) => {
	return axios.patch(APP_API.ORDER_ITEM, data, { headers: authHeader() });
};

const deleteItem = (item) => {
	return axios.delete(APP_API.ORDER_ITEM + `/${item.id}`, { headers: authHeader() });
};

const orderItemApi = {
	updateItem,
	deleteItem,
};

export default orderItemApi;
