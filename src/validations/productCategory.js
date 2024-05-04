import * as Yup from "yup";

const validationProductCategorySchema = Yup.object().shape({
	name: Yup.string()
		.trim()
		.required("Product Category name is required")
		.max(255, "Product Category name must be between 1 and 255 characters"),
	description: Yup.string()
		.trim()
		.max(255, "Product Category description must be under 256 characters"),
});

export { validationProductCategorySchema };
