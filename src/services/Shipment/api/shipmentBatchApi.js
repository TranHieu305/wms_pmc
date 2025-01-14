import axios from "axios";
import { APP_API } from "../../../shared/utils/apiConstants";
import authHeader from "../../../shared/utils/authHeader";

const markAsDelivered = (shipmentBatchId) => {
	return axios.patch(APP_API.SHIPMENT_BATCH + `/${shipmentBatchId}/status/delivered`, null, {
		headers: authHeader(),
	});
};

const shipmentBatchApi = {
	markAsDelivered,
};

export default shipmentBatchApi;
