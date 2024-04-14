import axios from "axios";
import { ModalConfirmGlobal } from "../ui/modal";
import { CUSTOMER_API_ENDPOINT } from "../../apis/config";
import { notificationError, notificationSuccess } from "../../utils/notification";
import { useLocation, useNavigate } from "react-router-dom";

function DeleteCustomerButton({ customer }) {
	const navigate = useNavigate();
	const location = useLocation();

	if (!customer) {
		return;
	}

	function handleConfirm() {
		axios
			.delete(CUSTOMER_API_ENDPOINT + `/${customer.id}`)
			.then(handleSuccessDelete)
			.catch(handleFailDelete);
	}

	function handleSuccessDelete() {
		if (location.pathname === "/customers") {
			navigate(0);
		} else {
			navigate("/customers");
		}
		notificationSuccess({ description: "Successfully deleted customer" });
	}

	function handleFailDelete() {
		notificationError({ description: "Cannot delete customer" });
	}

	return (
		<ModalConfirmGlobal
			title="Confirm delete"
			content={"Do you really want to delete customer? " + customer.name}
			onConfirm={handleConfirm}
		>
			Delete
		</ModalConfirmGlobal>
	);
}

export default DeleteCustomerButton;
