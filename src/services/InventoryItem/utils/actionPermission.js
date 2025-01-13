import Enum from "../../../shared/utils/enum";

const currentUser = JSON.parse(localStorage.getItem("user"));

const canViewBoard = () => {
	return !currentUser.authorities.includes(Enum.UserRole.USER);
};

const inventoryItemActionPermission = {
	canViewBoard,
};

export default inventoryItemActionPermission;
