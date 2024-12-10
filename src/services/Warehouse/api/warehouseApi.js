import axios from "axios";
import { WAREHOUSE_API } from "../../../shared/utils/apiConstants";
import authHeader from "../../../shared/utils/authHeader";

const getAllWarehouses = () => {
	return axios.get(WAREHOUSE_API.GET_ALL, { headers: authHeader() });
};

const saveWarehouse = (data) => {
	return axios.post(WAREHOUSE_API.CREATE, data, { headers: authHeader() });
};

const warehouseApi = {
	getAllWarehouses,
	saveWarehouse,
};

export default warehouseApi;
