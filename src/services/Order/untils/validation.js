import * as Yup from "yup";

const orderValidationShema = Yup.object().shape({
	name: Yup.string()
		.trim()
		.required("Order Name is required")
		.max(255, "Order name must be between 1 and 255 characters"),
	orderDate: Yup.string().required("Order date is required"),
	expectedDeliveryDate: Yup.string().required("Order expexted delivery date is required"),
	orderItems: Yup.array().of(
		Yup.object().shape({
			quantity: Yup.number()
				.required("Quantity is required")
				.min(0, "Quantity must be at least 0"),
		})
	),
});

const orderUpdateValidationSchema = Yup.object().shape({
	name: Yup.string()
		.trim()
		.required("Order Name is required")
		.max(255, "Order name must be between 1 and 255 characters"),
	orderDate: Yup.string().required("Order date is required"),
	expectedDeliveryDate: Yup.string().required("Order expexted delivery date is required"),
});
export default orderValidationShema;

export { orderUpdateValidationSchema };
