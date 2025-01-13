import Enum from "../../../shared/utils/enum";

const currentUser = JSON.parse(localStorage.getItem("user"));

const canAction = () => {
	return !viewOnly();
};

const viewOnly = () => {
	return !currentUser.authorities.includes(Enum.UserRole.ADMIN);
};

const userActionPermission = {
	canAction,
	viewOnly,
};

export default userActionPermission;
