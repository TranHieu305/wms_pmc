import Enum from "../../../shared/utils/enum";

const currentUser = JSON.parse(localStorage.getItem("user"));

const canAdd = () => {
	return (
		currentUser.authorities.includes(Enum.UserRole.ADMIN) ||
		currentUser.authorities.includes(Enum.UserRole.WAREHOUSE_MANAGER)
	);
};

const canUpdate = (batch) => {
	return (
		batch.createdBy === currentUser.userId && batch.status === Enum.BatchStatus.PENDING_APPROVAL
	);
};

const canDelete = (batch) => {
	return (
		batch.createdBy === currentUser.userId && batch.status === Enum.BatchStatus.PENDING_APPROVAL
	);
};

const canApprove = (batch) => {
	return (
		batch.pendingApproverIds.includes(currentUser.userId) &&
		batch.status === Enum.BatchStatus.PENDING_APPROVAL
	);
};

const canMarkAsDelivered = (batch) => {
	if (batch.createdBy !== currentUser.userId) {
		return false;
	}
	if (
		batch.inventoryAction === Enum.InventoryAction.IMPORT &&
		batch.status !== Enum.BatchStatus.PENDING
	) {
		return false;
	}
	if (
		batch.inventoryAction === Enum.InventoryAction.EXPORT &&
		batch.status !== Enum.BatchStatus.COMPLETED
	) {
		return false;
	}
	return true;
};

// View only batch items: User is not creator or Batch status not equals PENDING_APPROVAL
// const itemViewOnly = (batch) => {
// 	return (
// 		batch.createdBy !== currentUser.userId || batch.status !== Enum.BatchStatus.PENDING_APPROVAL
// 	);
// };

const batchActionPermission = {
	canAdd,
	canApprove,
	canDelete,
	canUpdate,
	canMarkAsDelivered,
	// itemViewOnly,
};

export default batchActionPermission;
