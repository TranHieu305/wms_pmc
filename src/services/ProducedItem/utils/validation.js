import * as Yup from "yup";

const producedItemSaveValidationSchema = Yup.object().shape({
	quantity: Yup.number()
		.required("Quantity is required")
		.moreThan(0, "Quantity must be more than 0"),
	approverIds: Yup.array()
		.test(
			"is-not-empty",
			"At least one approver must be selected.",
			(value) => value && value.length > 0
		)
		.required("At least one approver must be selected."),
	manufacturerIds: Yup.array()
		.test(
			"is-not-empty",
			"At least one manufacturer must be selected.",
			(value) => value && value.length > 0
		)
		.required("At least one manufacturer must be selected."),
});

export { producedItemSaveValidationSchema };
