import axios from "axios";
import { APP_API } from "../../../shared/utils/apiConstants";
import authHeader from "../../../shared/utils/authHeader";

const getAllShipments = () => {
	return axios.get(APP_API.SHIPMENT, { headers: authHeader() });
};

const getShipmentDetail = (shipmentId) => {
	return axios.get(APP_API.SHIPMENT + `/${shipmentId}`, { headers: authHeader() });
};

const deleteShipment = (shipment) => {
	return axios.delete(APP_API.SHIPMENT + `/${shipment.id}`, { headers: authHeader() });
};

const approve = (shipmentId) => {
	return axios.patch(APP_API.SHIPMENT + `/${shipmentId}/approve`, null, {
		headers: authHeader(),
	});
};

const create = (data) => {
	return axios.post(APP_API.SHIPMENT, data, { headers: authHeader() });
};

const reject = (shipmentId) => {
	return axios.patch(APP_API.SHIPMENT + `/${shipmentId}/reject`, null, {
		headers: authHeader(),
	});
};

const markAsInTransit = (shipmentId) => {
	return axios.patch(APP_API.SHIPMENT + `/${shipmentId}/status/inTransit`, null, {
		headers: authHeader(),
	});
};

const markAsCompleted = (shipmentId) => {
	return axios.patch(APP_API.SHIPMENT + `/${shipmentId}/status/completed`, null, {
		headers: authHeader(),
	});
};

const shipmentApi = {
	create,
	getAllShipments,
	getShipmentDetail,
	deleteShipment,
	approve,
	reject,
	markAsInTransit,
	markAsCompleted,
};

export default shipmentApi;
