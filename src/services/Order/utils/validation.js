import * as Yup from "yup";

const orderValidationShema = Yup.object().shape({
	name: Yup.string()
		.trim()
		.required("Order Name is required")
		.max(255, "Order name must be between 1 and 255 characters"),
	partnerId: Yup.number()
		.required("Please select order partner")
		.min(1, "Please select order partner"),
	orderDate: Yup.string().required("Order date is required"),
	expectedDeliveryDate: Yup.string().required("Order expexted delivery date is required"),
	orderItems: Yup.array().of(
		Yup.object().shape({
			quantity: Yup.number()
				.required("Quantity is required")
				.moreThan(0, "Quantity must be more than 0"),
		})
	),
});

const orderUpdateValidationSchema = Yup.object().shape({
	quantity: Yup.number().required("Quantity is required").min(0, "Quantity must be at least 0"),
});

const orderItemUpdateValidationSchema = Yup.object().shape({
	quantity: Yup.number()
		.required("Quantity is required")
		.moreThan(0, "Quantity must be more than 0"),
});

const orderItemAddValidationSchema = Yup.object().shape({
	quantity: Yup.number()
		.required("Quantity is required")
		.moreThan(0, "Quantity must be more than 0"),
	productId: Yup.number().required("Product is required"),
});

export default orderValidationShema;

export {
	orderUpdateValidationSchema,
	orderItemUpdateValidationSchema,
	orderItemAddValidationSchema,
};
