import Enum from "../../../shared/utils/enum";

const currentUser = JSON.parse(localStorage.getItem("user"));

const viewOnly = () => {
	return currentUser.authorities.includes(Enum.UserRole.USER);
};

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
		batch.status !== Enum.BatchStatus.PACKED
	) {
		return false;
	}
	return true;
};

const itemCanEdit = (batch, batchItem) => {
	if (batch.createdBy !== currentUser.userId) {
		return false;
	}
	if (
		batch.status === Enum.BatchStatus.REJECTED ||
		batch.status === Enum.BatchStatus.IN_TRANSIT ||
		batch.status === Enum.BatchStatus.DELIVERED
	) {
		return false;
	}
	if (batchItem.status === Enum.BatchItemStatus.COMPLETED) {
		return false;
	}
	return true;
};

const itemCanMarkComplete = (batch, batchItem) => {
	if (batch.inventoryAction !== Enum.InventoryAction.EXPORT) {
		return false;
	}
	if (batch.createdBy !== currentUser.userId) {
		return false;
	}
	if (
		batch.status === Enum.BatchStatus.PENDING_APPROVAL ||
		batch.status === Enum.BatchStatus.REJECTED ||
		batch.status === Enum.BatchStatus.IN_TRANSIT ||
		batch.status === Enum.BatchStatus.DELIVERED
	) {
		return false;
	}
	if (batchItem.status === Enum.BatchItemStatus.COMPLETED) {
		return false;
	}
	return true;
};

const itemCanAddProduced = (batch, batchItem) => {
	if (!batch.participantIds.includes(currentUser.userId)) {
		return false;
	}
	if (
		batch.status === Enum.BatchStatus.PENDING_APPROVAL ||
		batch.status === Enum.BatchStatus.REJECTED ||
		batch.status === Enum.BatchStatus.IN_TRANSIT ||
		batch.status === Enum.BatchStatus.DELIVERED
	) {
		return false;
	}
	return (
		batch.orderInventoryAction === Enum.InventoryAction.EXPORT &&
		batch.inventoryAction === Enum.InventoryAction.EXPORT &&
		batchItem.status !== Enum.BatchItemStatus.COMPLETED
	);
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
	viewOnly,
	itemCanAddProduced,
	itemCanEdit,
	itemCanMarkComplete,
	// itemViewOnly,
};

export default batchActionPermission;
