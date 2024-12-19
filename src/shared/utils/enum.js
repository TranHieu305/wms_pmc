const InventoryAction = {
	IMPORT: "IMPORT",
	EXPORT: "EXPORT",
};

const ProcessType = {
	MANUAL: "MANUAL",
	AUTOMATIC: "AUTOMATIC",
};

const CategoryType = {
	MATERIAL: "MATERIAL",
	PRODUCTION: "PRODUCTION",
};

const PartnerType = {
	SUPPLIER: "SUPPLIER",
	CUSTOMER: "CUSTOMER",
};

const UserRole = {
	USER: "USER",
	ADMIN: "ADMIN",
	WAREHOUSE_MANAGER: "WAREHOUSE_MANAGER",
};

const Enum = {
	InventoryAction,
	CategoryType,
	ProcessType,
	PartnerType,
	UserRole,
};

export default Enum;
