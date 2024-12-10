import axios from "axios";
import { PRODUCT_CATEGORY_API } from "../../../shared/utils/apiConstants";
import authHeader from "../../../shared/utils/authHeader";

const getAllProductCategory = () => {
	return axios.get(PRODUCT_CATEGORY_API.BASE, { headers: authHeader() });
};

const saveProductCategory = (data) => {
	return axios.post(PRODUCT_CATEGORY_API.BASE, data, { headers: authHeader() });
};

const editProductCategory = (data) => {
	return axios.put(PRODUCT_CATEGORY_API.BASE, data, { headers: authHeader() });
};

const deleteProductCategory = (category) => {
	return axios.delete(PRODUCT_CATEGORY_API.BASE + `/${category.id}`, { headers: authHeader() });
};

const productCategoryApi = {
	getAllProductCategory,
	saveProductCategory,
	deleteProductCategory,
	editProductCategory,
};

export default productCategoryApi;
