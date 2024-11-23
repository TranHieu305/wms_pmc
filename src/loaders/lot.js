import axios from "axios";
import { MATERIAL_ORDER_API_ENDPOINT } from "../utils/constants/apiEndpoint";
import { WAREHOUSE_API_ENDPOINT } from "../apis/config";

async function lotMaterialSaveLoader({ request, params }) {
	const orderId = params.orderId;
	const order = await axios.get(MATERIAL_ORDER_API_ENDPOINT + "/" + orderId);
	const warehouse = await axios.get(WAREHOUSE_API_ENDPOINT);

	return { order: order.data.data, warehouse: warehouse.data.data, lot: null };
}

export { lotMaterialSaveLoader };
