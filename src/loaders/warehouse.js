import axios from "axios";
import { WAREHOUSE_API_ENDPOINT } from "../apis/config";

async function warehouseDetailLoader({ request, params }) {
	const warehouseId = params.warehouseId;

	const response = await axios.get(WAREHOUSE_API_ENDPOINT + `/${warehouseId}`);

	return response.data; //response body
}

export { warehouseDetailLoader };
