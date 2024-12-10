import axios from "axios";
import { PRODUCT_API } from "../../../shared/utils/apiConstants";
import authHeader from "../../../shared/utils/authHeader";

const getAllProducts = () => {
	return axios.get(PRODUCT_API.BASE, { headers: authHeader() });
};

const saveProduct = (data) => {
	return axios.post(PRODUCT_API.BASE, data, { headers: authHeader() });
};

const editProduct = (data) => {
	return axios.put(PRODUCT_API.BASE, data, { headers: authHeader() });
};

const deleteProduct = (category) => {
	return axios.delete(PRODUCT_API.BASE + `/${category.id}`, { headers: authHeader() });
};

const productApi = {
	getAllProducts,
	saveProduct,
	editProduct,
	deleteProduct,
};

export default productApi;
