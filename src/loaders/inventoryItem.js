import axios from "axios";
import { INVENTORY_ITEM_API_ENDPOINT, LOT_API_ENDPOINT } from "../utils/constants/apiEndpoint";

async function inventoryItemLoader() {
	const inventoryItems = await axios.get(INVENTORY_ITEM_API_ENDPOINT);
	const lots = await axios.get(LOT_API_ENDPOINT);

	return { inventoryItems: inventoryItems.data.data, lots: lots.data.data };
}

export { inventoryItemLoader };
