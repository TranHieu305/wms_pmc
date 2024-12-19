import * as Yup from "yup";

const userCreateValidationSchema = Yup.object().shape({
	username: Yup.string()
		.trim()
		.required("UserName is required")
		.max(255, "Username must be between 1 and 255 characters"),
	fullName: Yup.string()
		.trim()
		.required("User fullname is required")
		.max(255, "User fullname must be between 1 and 255 characters"),
	password: Yup.string()
		.trim()
		.required("User password is required")
		.max(255, "User password must be between 1 and 255 characters"),
	email: Yup.string().email("Email is not valid").required("User email is required"),
	phone: Yup.string()
		.trim()
		.required("User phone number is required")
		.matches(/^\d{1,15}$/, "Invalid phone number"),
});

export { userCreateValidationSchema };
