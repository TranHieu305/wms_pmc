import axios from "axios";
import { APP_API } from "../../../shared/utils/apiConstants";
import authHeader from "../../../shared/utils/authHeader";

const getAllBatches = () => {
	return axios.get(APP_API.BATCH, { headers: authHeader() });
};

const batchApi = {
	getAllBatches,
};

export default batchApi;
