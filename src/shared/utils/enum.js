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
	PACKED: "PACKED",
};

const BatchItemStatus = {
	PENDING: "PENDING",
	COMPLETED: "COMPLETED",
};

const ProducedItemStatus = {
	PENDING_APPROVAL: "PENDING_APPROVAL",
	COMPLETED: "COMPLETED",
	APPROVED: "APPROVED",
};

const ApprovalStatus = {
	PENDING_APPROVAL: "PENDING_APPROVAL",
	REJECTED: "REJECTED",
	APPROVED: "APPROVED",
};

const VehicleStatus = {
	AVAILABLE: "AVAILABLE",
	IN_TRANSIT: "IN_TRANSIT",
};

const ShipmentStatus = {
	PENDING_APPROVAL: "PENDING_APPROVAL",
	REJECTED: "REJECTED",
	PENDING: "PENDING",
	COMPLETED: "COMPLETED",
	IN_TRANSIT: "IN_TRANSIT",
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
	VehicleStatus,
	ProducedItemStatus,
	ShipmentStatus,
};

export default Enum;
