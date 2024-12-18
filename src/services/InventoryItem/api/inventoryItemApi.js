import axios from "axios";
import { APP_API } from "../../../shared/utils/apiConstants";
import authHeader from "../../../shared/utils/authHeader";

const getAll = () => {
	return axios.get(APP_API.INVENTORY_ITEM, { headers: authHeader() });
};

const inventoryItemApi = {
	getAll,
};

export default inventoryItemApi;
