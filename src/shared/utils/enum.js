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
	WAREHOUSE_MANAGER: "WAREHOUSE_MANAGER",
	ACCOUNTANT: "ACCOUNTANT",
	ADMIN: "ADMIN",
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

const ShipmentBatchStatus = {
	PACKED: "PACKED",
	IN_TRANSIT: "IN_TRANSIT",
	DELIVERED: "DELIVERED",
};

const Menu = {
	warehouse: {
		key: "warehouses",
		label: "Warehouses",
	},
	product: {
		key: "product",
		label: "Products",
	},
	products: {
		key: "/products",
		label: "All Product",
	},
	productCategory: {
		key: "/product-categories",
		label: "Category",
	},
	partner: {
		key: "partners",
		label: "Partners",
	},
	inventoryItem: {
		key: "inventory-items",
		label: "Inventory items",
	},
	order: {
		key: "orders",
		label: "Orders",
	},
	shipment: {
		key: "shipments",
		label: "Shipments",
	},
	batch: {
		key: "/batches",
		label: "Batches",
	},
	shipments: {
		key: "/shipments",
		label: "Shipments",
	},
	vehicles: {
		key: "/vehicles",
		label: "Vehicles",
	},
	setting: {
		key: "settings",
		label: "Settings",
	},
	user: {
		key: "/users",
		label: "Users",
	},
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
	ShipmentBatchStatus,
	Menu,
};

export default Enum;
