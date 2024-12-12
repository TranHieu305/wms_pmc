import axios from "axios";
import { WAREHOUSE_API } from "../../../shared/utils/apiConstants";
import authHeader from "../../../shared/utils/authHeader";

const getAllWarehouses = () => {
	return axios.get(WAREHOUSE_API.BASE, { headers: authHeader() });
};

const getWarehouseDetail = (warehouseId) => {
	return axios.get(WAREHOUSE_API.BASE + `/${warehouseId}`, { headers: authHeader() });
};

const saveWarehouse = (data) => {
	return axios.post(WAREHOUSE_API.BASE, data, { headers: authHeader() });
};

const editWarehouse = (data) => {
	return axios.put(WAREHOUSE_API.BASE, data, { headers: authHeader() });
};

const deleteWarehouse = (warehouse) => {
	return axios.delete(WAREHOUSE_API.BASE + `/${warehouse.id}`, { headers: authHeader() });
};

const warehouseApi = {
	getAllWarehouses,
	saveWarehouse,
	editWarehouse,
	deleteWarehouse,
	getWarehouseDetail,
};

export default warehouseApi;
