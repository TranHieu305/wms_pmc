import Enum from "../../../shared/utils/enum";

const currentUser = JSON.parse(localStorage.getItem("user"));

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

const canCreateBatch = (order) => {
	return (
		order.participantIds.includes(currentUser.userId) &&
		(currentUser.authorities.includes(Enum.UserRole.ADMIN) ||
			currentUser.authorities.includes(Enum.UserRole.WAREHOUSE_MANAGER)) &&
		order.status === Enum.OrderStatus.PENDING
	);
};

const itemViewOnly = (order) => {
	return (
		order.createdBy !== currentUser.userId || order.status !== Enum.OrderStatus.PENDING_APPROVAL
	);
};

const orderActionPermission = {
	canAdd,
	canApprove,
	canCreateBatch,
	canDelete,
	canUpdate,
	canMarkAsComplete,
	itemViewOnly,
};

export default orderActionPermission;
