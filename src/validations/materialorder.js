import * as Yup from "yup";

const validationMaterialOrderSchema = Yup.object().shape({
	name: Yup.string()
		.trim()
		.required("Material Order Name is required")
		.max(255, "Material Order name must be between 1 and 255 characters"),
	orderItems: Yup.array().of(
		Yup.object().shape({
			name: Yup.string().trim().required("Product name is required"),
			uom: Yup.string().trim().required("UOM is required"),
			quantity: Yup.number()
				.required("Quantity is required")
				.min(0, "Quantity must be at least 0"),
		})
	),
});

export { validationMaterialOrderSchema };
