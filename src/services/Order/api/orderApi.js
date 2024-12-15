import axios from "axios";
import { ORDER_API } from "../../../shared/utils/apiConstants";
import authHeader from "../../../shared/utils/authHeader";

const getAllOrders = () => {
	return axios.get(ORDER_API.BASE, { headers: authHeader() });
};

const getOrderDetail = (orderId) => {
	return axios.get(ORDER_API.BASE + `/${orderId}`, { headers: authHeader() });
};

const saveOrder = (data) => {
	return axios.post(ORDER_API.BASE, data, { headers: authHeader() });
};

const orderApi = {
	getAllOrders,
	saveOrder,
	getOrderDetail,
};

export default orderApi;
