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

const markAsCompleted = (orderId) => {
	return axios.patch(ORDER_API.BASE + `/${orderId}/status/completed`, null, {
		headers: authHeader(),
	});
};

const approve = (orderId) => {
	return axios.patch(ORDER_API.BASE + `/${orderId}/approve`, null, {
		headers: authHeader(),
	});
};

const reject = (orderId) => {
	return axios.patch(ORDER_API.BASE + `/${orderId}/reject`, null, {
		headers: authHeader(),
	});
};

const orderApi = {
	getAllOrders,
	saveOrder,
	getOrderDetail,
	updateOrder,
	deleteOrder,
	addOrderItem,
	markAsCompleted,
	approve,
	reject,
};

export default orderApi;
