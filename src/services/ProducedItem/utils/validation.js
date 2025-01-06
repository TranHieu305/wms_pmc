import * as Yup from "yup";

const producedItemSaveValidationSchema = Yup.object().shape({
	quantity: Yup.number()
		.required("Quantity is required")
		.moreThan(0, "Quantity must be more than 0"),
});

export { producedItemSaveValidationSchema };
