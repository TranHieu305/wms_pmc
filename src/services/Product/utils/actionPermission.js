import Enum from "../../../shared/utils/enum";

const currentUser = JSON.parse(localStorage.getItem("user"));

const canAction = () => {
	return !viewOnly();
};

const viewOnly = () => {
	return !currentUser.authorities.includes(Enum.UserRole.ADMIN);
};

const viewOnlyGeneral = () => {
	return currentUser.authorities.includes(Enum.UserRole.USER);
};

const productActionPermission = {
	canAction,
	viewOnly,
	viewOnlyGeneral,
};

export default productActionPermission;
