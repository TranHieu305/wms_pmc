import axios from "axios";
import { PRODUCT_API_ENDPOINT, PRODUCT_CATEGORY_API_ENDPOINT } from "../utils/constants";
import { PRODUCT_PRICE_API_ENDPOINT, SUPPLIER_API_ENDPOINT } from "../utils/constants/apiEndpoint";

async function productsLoader() {
	const products = await axios.get(PRODUCT_API_ENDPOINT);
	const categories = await axios.get(PRODUCT_CATEGORY_API_ENDPOINT);
	return {
		products: products.data.data,
		categories: categories.data.data,
	};
}

async function productDetailLoader({ request, params }) {
	const productId = params.productId;
	const product = await axios.get(PRODUCT_API_ENDPOINT + `/${productId}`);
	const productPrices = await axios.get(
		PRODUCT_PRICE_API_ENDPOINT + `/current-prices/product/${productId}`
	);
	const suppliers = await axios.get(SUPPLIER_API_ENDPOINT);
	// const customers = await axios.get(CIS)

	return {
		product: product.data.data,
		productPrices: productPrices.data.data,
		suppliers: suppliers.data.data,
	};
}

export { productsLoader, productDetailLoader };
