import * as Yup from "yup";

const validationWarehouseSchema = Yup.object().shape({
	name: Yup.string()
		.required("Warehouse Name is required")
		.max(255, '"Warehouse name must be between 1 and 255 characters'),
	description: Yup.string()
		.required("Warehouse description is required")
		.max(255, '"Warehouse description must be between 1 and 255 characters'),
	address: Yup.string()
		.required("Warehouse address is required")
		.max(255, '"Warehouse address must be between 1 and 255 characters'),
});

export { validationWarehouseSchema };
