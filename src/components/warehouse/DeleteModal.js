import axios from "axios";
import { ModalConfirmGlobal } from "../ui/modal";
import { WAREHOUSE_API_ENDPOINT } from "../../apis/config";
import { notificationError, notificationSuccess } from "../../utils/notification";
import { useLocation, useNavigate } from "react-router-dom";

function DeleteWarehouseButton({ warehouse }) {
	const navigate = useNavigate();
	const location = useLocation();

	if (!warehouse) {
		return;
	}

	function handleConfirm() {
		axios
			.delete(WAREHOUSE_API_ENDPOINT + `/${warehouse.id}`)
			.then(handleSuccessDelete)
			.catch(handleFailDelete);
	}

	function handleSuccessDelete() {
		if (location.pathname === "/warehouses") {
			navigate(0);
		} else {
			navigate("/warehouses");
		}
		notificationSuccess({ description: "Successfully deleted warehouse" });
	}

	function handleFailDelete() {
		notificationError({ description: "Cannot delete warehouse" });
	}

	return (
		<ModalConfirmGlobal
			title="Confirm delete"
			content={
				<p>
					Confirm to delete warehouse: <b>{warehouse.name}</b>
				</p>
			}
			onConfirm={handleConfirm}
		>
			Delete
		</ModalConfirmGlobal>
	);
}

export default DeleteWarehouseButton;
