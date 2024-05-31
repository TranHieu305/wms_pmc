import axios from "axios";
import { PRODUCT_API_ENDPOINT, PRODUCT_CATEGORY_API_ENDPOINT } from "../utils/constants";

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
	const categories = await axios.get(PRODUCT_CATEGORY_API_ENDPOINT);
	return {
		product: product.data.data,
		categories: categories.data.data,
	};
}

export { productsLoader, productDetailLoader };
