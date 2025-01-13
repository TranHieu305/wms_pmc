import Enum from "../../../shared/utils/enum";

const currentUser = JSON.parse(localStorage.getItem("user"));

const canAction = () => {
	return !viewOnly();
};

const viewOnly = () => {
	return !currentUser.authorities.includes(Enum.UserRole.ADMIN);
};

const canImportExport = (warehouse) => {
	return (
		currentUser.userId === warehouse.supervisorId ||
		currentUser.authorities.includes(Enum.UserRole.ADMIN)
	);
};

const warehouseActionPermission = {
	canAction,
	viewOnly,
	canImportExport,
};

export default warehouseActionPermission;
