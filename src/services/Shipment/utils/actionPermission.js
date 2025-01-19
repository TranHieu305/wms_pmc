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
		shipment.status === Enum.ShipmentStatus.PENDING_APPROVAL
	);
};

const canApprove = (shipment) => {
	return (
		shipment.pendingApproverIds.includes(currentUser.userId) &&
		shipment.status === Enum.ShipmentStatus.PENDING_APPROVAL
	);
};

const canMarkAsCompleted = (shipment) => {
	return (
		shipment.createdBy === currentUser.userId &&
		shipment.status === Enum.ShipmentStatus.IN_TRANSIT
	);
};

const canMarkAsInTransit = (shipment) => {
	return (
		shipment.createdBy === currentUser.userId && shipment.status === Enum.ShipmentStatus.PENDING
	);
};

const itemCanMarkDelivered = (shipment, shipmentBatch) => {
	return (
		shipment.participantIds.includes(currentUser.userId) &&
		shipment.status === Enum.ShipmentStatus.IN_TRANSIT &&
		shipmentBatch.status === Enum.ShipmentBatchStatus.IN_TRANSIT
	);
};

const shipmentActionPermission = {
	viewOnly,
	canAdd,
	canDelete,
	canApprove,
	canAction,
	canMarkAsInTransit,
	canMarkAsCompleted,
	itemCanMarkDelivered,
};

export default shipmentActionPermission;
