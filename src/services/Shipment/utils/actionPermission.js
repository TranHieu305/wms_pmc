import Enum from "../../../shared/utils/enum";

const currentUser = JSON.parse(localStorage.getItem("user"));

const canAction = () => {
	return !viewOnly();
};

const viewOnly = () => {
	return (
		currentUser.authorities.includes(Enum.UserRole.USER) ||
		currentUser.authorities.includes(Enum.UserRole.ACCOUNTANT)
	);
};

const canAdd = () => {
	return (
		currentUser.authorities.includes(Enum.UserRole.ADMIN) ||
		currentUser.authorities.includes(Enum.UserRole.WAREHOUSE_MANAGER)
	);
};

const canDelete = (shipment) => {
	return (
		shipment.createdBy === currentUser.userId &&
		shipment.status === Enum.BatchStatus.PENDING_APPROVAL
	);
};

const canApprove = (shipment) => {
	return (
		shipment.pendingApproverIds.includes(currentUser.userId) &&
		shipment.status === Enum.BatchStatus.PENDING_APPROVAL
	);
};

const shipmentActionPermission = {
	viewOnly,
	canAdd,
	canDelete,
	canApprove,
	canAction,
};

export default shipmentActionPermission;
