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

const OrderStatus = {
	PENDING_APPROVAL: "PENDING_APPROVAL",
	REJECTED: "REJECTED",
	PENDING: "PENDING",
	COMPLETED: "COMPLETED",
};

const BatchStatus = {
	PENDING_APPROVAL: "PENDING_APPROVAL",
	REJECTED: "REJECTED",
	PENDING: "PENDING",
	PACKING: "PACKING",
	COMPLETED: "COMPLETED",
	IN_TRANSIT: "IN_TRANSIT",
	DELIVERED: "DELIVERED",
};

const BatchItemStatus = {
	PENDING: "PENDING",
	COMPLETED: "COMPLETED",
};

const ProducedItemStatus = {
	PENDING: "PENDING",
	COMPLETED: "COMPLETED",
	APPROVED: "APPROVED",
};

const ApprovalStatus = {
	PENDING_APPROVAL: "PENDING_APPROVAL",
	REJECTED: "REJECTED",
	APPROVED: "APPROVED",
};

const Enum = {
	InventoryAction,
	CategoryType,
	ProcessType,
	PartnerType,
	UserRole,
	OrderStatus,
	BatchStatus,
	BatchItemStatus,
	ApprovalStatus,
	ProducedItemStatus,
};

export default Enum;
