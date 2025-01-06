import axios from "axios";
import { APP_API } from "../../../shared/utils/apiConstants";
import authHeader from "../../../shared/utils/authHeader";

const createFromBatchItem = (data) => {
	return axios.patch(APP_API.PRODUCED_ITEM, data, { headers: authHeader() });
};

const producedItemApi = {
	createFromBatchItem,
};

export default producedItemApi;
