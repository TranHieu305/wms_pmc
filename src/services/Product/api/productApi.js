import axios from "axios";
import { PRODUCT_API } from "../../../shared/utils/apiConstants";
import authHeader from "../../../shared/utils/authHeader";

const getAllProducts = () => {
	return axios.get(PRODUCT_API.BASE, { headers: authHeader() });
};

const getProductDetail = (productId) => {
	return axios.get(PRODUCT_API.BASE + `/${productId}`, { headers: authHeader() });
};

const saveProduct = (data) => {
	return axios.post(PRODUCT_API.BASE, data, { headers: authHeader() });
};

const editProduct = (data) => {
	return axios.put(PRODUCT_API.BASE, data, { headers: authHeader() });
};

const deleteProduct = (product) => {
	return axios.delete(PRODUCT_API.BASE + `/${product.id}`, { headers: authHeader() });
};

const productApi = {
	getAllProducts,
	saveProduct,
	editProduct,
	deleteProduct,
	getProductDetail,
};

export default productApi;
