import axios from "axios";
import { PRODUCT_WAREHOUSE_API } from "../../../shared/utils/apiConstants";
import authHeader from "../../../shared/utils/authHeader";

const getByWarehouseId = (warehouseId) => {
	return axios.get(PRODUCT_WAREHOUSE_API.BASE + `/warehouse/${warehouseId}`, {
		headers: authHeader(),
	});
};

const getByProductId = (productId) => {
	return axios.get(PRODUCT_WAREHOUSE_API.BASE + `/product/${productId}`, {
		headers: authHeader(),
	});
};

const productWarehouseApi = {
	getByWarehouseId,
	getByProductId,
};

export default productWarehouseApi;
