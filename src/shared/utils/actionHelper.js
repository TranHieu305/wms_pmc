import Enum from "./enum";

const currentUserCanApprove = (entity) => {
	if (!entity) {
		return false;
	}
	if (entity.status === Enum.ApprovalStatus.REJECTED) {
		return false;
	}

	const currentUser = JSON.parse(localStorage.getItem("user"));
	if (!currentUser) {
		return false;
	}
	if (!entity.approverIds.includes(currentUser.userId)) {
		return false;
	}
	if (!entity.pendingApproverIds.includes(currentUser.userId)) {
		return false;
	}
	return true;
};

const actionHelper = {
	currentUserCanApprove,
};

export default actionHelper;
