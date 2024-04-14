import * as Yup from "yup";

const validationCustomerSchema = Yup.object().shape({
	name: Yup.string()
		.required("Customer Name is required")
		.max(255, "Customer name must be between 1 and 255 characters"),
	description: Yup.string().max(255, "Customer description must be between 1 and 255 characters"),
	address: Yup.string()
		.required("Customer address is required")
		.max(255, "Customer address must be between 1 and 255 characters"),
	email: Yup.string().email("Email is not valid").required("Customer email is required"),
	phone: Yup.string()
		.required("Customer phone number is required")
		.matches(/^\d{1,14}$/, "Invalid phone number"),
});

export { validationCustomerSchema };
