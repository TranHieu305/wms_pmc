import * as Yup from "yup";

const validationSupplierSchema = Yup.object().shape({
	name: Yup.string()
		.trim()
		.required("Supplier Name is required")
		.max(255, "Supplier name must be between 1 and 255 characters"),
	description: Yup.string().max(255, "Supplier description must be between 1 and 255 characters"),
	address: Yup.string().max(255, "Supplier address must be between 1 and 255 characters"),
	email: Yup.string().email("Email is not valid").required("Supplier email is required"),
	phone: Yup.string()
		.trim()
		.required("Supplier phone number is required")
		.matches(/^\d{1,15}$/, "Invalid phone number"),
});

export { validationSupplierSchema };
