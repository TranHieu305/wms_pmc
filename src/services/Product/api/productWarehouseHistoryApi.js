import axios from "axios";
import authHeader from "../../../shared/utils/authHeader";
import { PRODUCT_WAREHOUSE_HISTORY_API } from "../../../shared/utils/apiConstants";

const save = (data) => {
	return axios.post(PRODUCT_WAREHOUSE_HISTORY_API.BASE, data, {
		headers: authHeader(),
	});
};

const productWarehouseHistoryApi = {
	save,
};

export default productWarehouseHistoryApi;
