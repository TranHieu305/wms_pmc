import Enum from "../../../shared/utils/enum";

const currentUser = JSON.parse(localStorage.getItem("user"));

const canAdd = () => {
	return (
		currentUser.authorities.includes(Enum.UserRole.ADMIN) ||
		currentUser.authorities.includes(Enum.UserRole.ACCOUNTANT)
	);
};

const partnerActionPermission = {
	canAdd,
};

export default partnerActionPermission;
