import * as Yup from "yup";

const validationLoginSchema = Yup.object().shape({
	email: Yup.string()
		.trim()
		.required("Email is required")
		.max(255, "Email must be between 1 and 255 characters"),
	password: Yup.string()
		.trim()
		.required("Password is required")
		.max(255, '"Password must be between 1 and 255 characters'),
});

export default validationLoginSchema;
