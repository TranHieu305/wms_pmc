import axios from "axios";
import { SUPPLIER_API_ENDPOINT } from "../apis/config";
import {
	MATERIAL_ORDER_API_ENDPOINT,
	PRODUCT_PRICE_API_ENDPOINT,
} from "../utils/constants/apiEndpoint";

async function supplierDetailLoader({ request, params }) {
	const supplierId = params.supplierId;

	const supplier = await axios.get(SUPPLIER_API_ENDPOINT + `/${supplierId}`);

	const productPrices = await axios.get(
		PRODUCT_PRICE_API_ENDPOINT + `/current-prices/partner/${supplierId}`
	);

	const orders = await axios.get(MATERIAL_ORDER_API_ENDPOINT);
	return {
		supplier: supplier.data.data,
		productPrices: productPrices.data.data,
		orders: orders.data.data,
	}; //response body
}

export { supplierDetailLoader };
