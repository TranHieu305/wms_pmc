import * as Yup from "yup";

const productCategoryValidationSchema = Yup.object().shape({
	name: Yup.string()
		.trim()
		.required("Product Category name is required")
		.max(255, "Product Category name must be between 1 and 255 characters"),
	description: Yup.string()
		.trim()
		.max(255, "Product Category description must be under 256 characters"),
});

const productValidationSchema = Yup.object().shape({
	name: Yup.string()
		.trim()
		.required("Product name is required")
		.max(255, "Product name must be between 1 and 255 characters"),
	description: Yup.string().trim().max(255, "Product description must be under 256 characters"),
	uom: Yup.string()
		.trim()
		.required("Product uom is required")
		.max(63, "Product uom must be under 64 characters"),
	code: Yup.string()
		.trim()
		.required("Product code is required")
		.max(63, "Product code must be under 64 characters"),
	categoryId: Yup.number().min(1, "Please select product category"),
});

export { productCategoryValidationSchema, productValidationSchema };
