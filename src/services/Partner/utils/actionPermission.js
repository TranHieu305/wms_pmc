import Enum from "../../../shared/utils/enum";

const currentUser = JSON.parse(localStorage.getItem("user"));

const canAction = () => {
	return currentUser.authorities.includes(Enum.UserRole.ADMIN);
};

const viewOnly = () => {
	return !canAction();
};

const partnerActionPermission = {
	canAction,
	viewOnly,
};

export default partnerActionPermission;
