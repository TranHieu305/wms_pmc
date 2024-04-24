import axios from "axios";
import { SUPPLIER_API_ENDPOINT } from "../apis/config";

async function supplierDetailLoader({ request, params }) {
	const supplierId = params.supplierId;

	const response = await axios.get(SUPPLIER_API_ENDPOINT + `/${supplierId}`);

	return response.data; //response body
}

export { supplierDetailLoader };
