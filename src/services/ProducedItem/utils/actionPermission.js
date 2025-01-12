import Enum from "../../../shared/utils/enum";

const currentUser = JSON.parse(localStorage.getItem("user"));

const canApprove = (item) => {
	return (
		item.pendingApproverIds.includes(currentUser.userId) &&
		item.status === Enum.ProducedItemStatus.PENDING_APPROVAL
	);
};

const producedItemActionPermission = {
	canApprove,
};

export default producedItemActionPermission;
