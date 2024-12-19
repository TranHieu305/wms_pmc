import * as Yup from "yup";

const batchValidationSchema = Yup.object().shape({
	name: Yup.string()
		.trim()
		.required("Batch Name is required")
		.max(255, "Batch name must be between 1 and 255 characters"),
	batchItems: Yup.array().of(
		Yup.object().shape({
			quantity: Yup.number()
				.required("Quantity is required")
				.moreThan(0, "Quantity must be more than 0"),
		})
	),
});

const batchUpdateValidationSchema = Yup.object().shape({
	name: Yup.string()
		.trim()
		.required("Batch Name is required")
		.max(255, "Batch name must be between 1 and 255 characters"),
});

const batchItemUpdateValidationSchema = Yup.object().shape({
	quantity: Yup.number()
		.required("Quantity is required")
		.moreThan(0, "Quantity must be more than 0"),
});

export default batchValidationSchema;

export { batchUpdateValidationSchema, batchItemUpdateValidationSchema };
