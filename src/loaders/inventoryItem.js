import axios from "axios";
import { INVENTORY_ITEM_API_ENDPOINT } from "../utils/constants/apiEndpoint";

async function inventoryItemLoader() {
	const response = await axios.get(INVENTORY_ITEM_API_ENDPOINT);

	return response.data.data;
}

export { inventoryItemLoader };
