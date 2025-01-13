import Enum from "../../../shared/utils/enum";

const currentUser = JSON.parse(localStorage.getItem("user"));

const viewOnly = () => {
	return currentUser.authorities.includes(Enum.UserRole.USER);
};

const canAdd = () => {
	return (
		currentUser.authorities.includes(Enum.UserRole.ADMIN) ||
		currentUser.authorities.includes(Enum.UserRole.ACCOUNTANT)
	);
};

const canUpdate = (order) => {
	return (
		order.createdBy === currentUser.userId && order.status === Enum.OrderStatus.PENDING_APPROVAL
	);
};

const canDelete = (order) => {
	return (
		order.createdBy === currentUser.userId && order.status === Enum.OrderStatus.PENDING_APPROVAL
	);
};

const canApprove = (order) => {
	return (
		order.pendingApproverIds.includes(currentUser.userId) &&
		order.status === Enum.OrderStatus.PENDING_APPROVAL
	);
};

const canMarkAsComplete = (order) => {
	return order.createdBy === currentUser.userId && order.status === Enum.OrderStatus.PENDING;
};

// Created batch from PENDING order
// Admin or warehouse_manager - participant can action
const canCreateBatch = (order) => {
	if (!order.status === Enum.OrderStatus.PENDING) {
		return false;
	}
	return (
		currentUser.authorities.includes(Enum.UserRole.ADMIN) ||
		(currentUser.authorities.includes(Enum.UserRole.WAREHOUSE_MANAGER) &&
			order.participantIds.includes(currentUser.userId))
	);
};

const itemViewOnly = (order) => {
	return (
		order.createdBy !== currentUser.userId || order.status !== Enum.OrderStatus.PENDING_APPROVAL
	);
};

const orderActionPermission = {
	viewOnly,
	canAdd,
	canApprove,
	canCreateBatch,
	canDelete,
	canUpdate,
	canMarkAsComplete,
	itemViewOnly,
};

export default orderActionPermission;
