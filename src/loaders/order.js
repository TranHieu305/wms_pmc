import axios from "axios";
import {
	MATERIAL_ORDER_API_ENDPOINT,
	PRODUCT_PRICE_API_ENDPOINT,
} from "../utils/constants/apiEndpoint";

async function materialOrderLoader() {
	const response = await axios.get(MATERIAL_ORDER_API_ENDPOINT);
	return response.data.data;
}

async function materialOrderDetailLoader({ request, params }) {
	const orderId = params.orderId;

	const orderResponse = await axios.get(MATERIAL_ORDER_API_ENDPOINT + `/${orderId}`);
	return orderResponse.data.data;
}

async function orderCreateLoader() {
	const currentPrices = await axios.get(PRODUCT_PRICE_API_ENDPOINT + "/current-prices");
	return { currentPrices: currentPrices.data.data, detailOrder: null };
}

async function materialOrderEditLoader({ request, params }) {
	const orderId = params.orderId;
	const orderResponse = await axios.get(MATERIAL_ORDER_API_ENDPOINT + `/${orderId}`);
	const currentPrices = await axios.get(PRODUCT_PRICE_API_ENDPOINT + "/current-prices");
	return { currentPrices: currentPrices.data.data, detailOrder: orderResponse.data.data };
}

export {
	materialOrderDetailLoader,
	materialOrderLoader,
	orderCreateLoader,
	materialOrderEditLoader,
};
