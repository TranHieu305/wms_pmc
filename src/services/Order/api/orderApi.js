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

const updateOrder = (data) => {
	return axios.put(ORDER_API.BASE, data, { headers: authHeader() });
};

const deleteOrder = (order) => {
	return axios.delete(ORDER_API.BASE + `/${order.id}`, { headers: authHeader() });
};

const addOrderItem = (order, data) => {
	return axios.post(ORDER_API.BASE + `/${order.id}`, data, { headers: authHeader() });
};

const orderApi = {
	getAllOrders,
	saveOrder,
	getOrderDetail,
	updateOrder,
	deleteOrder,
	addOrderItem,
};

export default orderApi;
