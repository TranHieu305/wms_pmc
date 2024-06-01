import * as Yup from "yup";

const validationProductPriceSchema = Yup.object().shape({
	description: Yup.string()
		.trim()
		.max(255, "Product price description must be under 256 characters"),
});

export { validationProductPriceSchema };
