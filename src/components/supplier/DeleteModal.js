import axios from "axios";
import { ModalConfirmGlobal } from "../ui/modal";
import { SUPPLIER_API_ENDPOINT } from "../../apis/config";
import { notificationError, notificationSuccess } from "../../utils/notification";
import { useLocation, useNavigate } from "react-router-dom";

function DeleteSupplierButton({ supplier }) {
	const navigate = useNavigate();
	const location = useLocation();

	if (!supplier) {
		return;
	}

	function handleConfirm() {
		axios
			.delete(SUPPLIER_API_ENDPOINT + `/${supplier.id}`)
			.then(handleSuccessDelete)
			.catch(handleFailDelete);
	}

	function handleSuccessDelete() {
		if (location.pathname === "/suppliers") {
			navigate(0);
		} else {
			navigate("/suppliers");
		}
		notificationSuccess({ description: "Successfully deleted supplier" });
	}

	function handleFailDelete() {
		notificationError({ description: "Cannot delete supplier" });
	}

	return (
		<ModalConfirmGlobal
			title="Confirm delete"
			content={"Do you really want to delete supplier? " + supplier.name}
			onConfirm={handleConfirm}
		>
			Delete
		</ModalConfirmGlobal>
	);
}

export default DeleteSupplierButton;
