import * as Yup from "yup";

const vehicleValidationSchema = Yup.object().shape({
	name: Yup.string()
		.trim()
		.required("Vehicle name is required")
		.max(255, "Vehicle name must be between 1 and 255 characters"),
	description: Yup.string()
		.trim()
		.max(255, "Vehicle description must be between 1 and 255 characters"),
	licensePlate: Yup.string()
		.trim()
		.required("Vehicle license plate is required")
		.max(255, "Vehicle license plate must be between 1 and 255 characters"),
	loadCapacity: Yup.number()
		.required("Vehicle load capacity is required")
		.moreThan(0, "Vehicle load capacity must be more than 0"),
});

export { vehicleValidationSchema };
