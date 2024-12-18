import axios from "axios";
import authHeader from "../../../shared/utils/authHeader";
import { PRODUCT_WAREHOUSE_HISTORY_API } from "../../../shared/utils/apiConstants";

const save = (data) => {
	return axios.post(PRODUCT_WAREHOUSE_HISTORY_API.BASE, data, {
		headers: authHeader(),
	});
};

const getByWarehouseId = (warehouseId) => {
	return axios.get(PRODUCT_WAREHOUSE_HISTORY_API.BASE + `/warehouse/${warehouseId}`, {
		headers: authHeader(),
	});
};

const productWarehouseHistoryApi = {
	save,
	getByWarehouseId,
};

export default productWarehouseHistoryApi;
