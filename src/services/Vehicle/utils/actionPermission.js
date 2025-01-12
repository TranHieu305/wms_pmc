import Enum from "../../../shared/utils/enum";

const currentUser = JSON.parse(localStorage.getItem("user"));

const canAdd = () => {
	return currentUser.authorities.includes(Enum.UserRole.ADMIN);
};

const canEdit = () => {
	return currentUser.authorities.includes(Enum.UserRole.ADMIN);
};

const vehicleActionPermission = {
	canAdd,
	canEdit,
};

export default vehicleActionPermission;
