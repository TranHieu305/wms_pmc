import axios from "axios";
import { CUSTOMER_API_ENDPOINT } from "../apis/config";

async function customerDetailLoader({ request, params }) {
	const customerId = params.customerId;

	const response = await axios.get(CUSTOMER_API_ENDPOINT + `/${customerId}`);

	return response.data; //response body
}

export { customerDetailLoader };
