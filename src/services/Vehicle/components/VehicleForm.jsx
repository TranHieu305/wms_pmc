import { vehicleValidationSchema } from "../utils/validation";
import { useModal } from "../../../shared/components/ModalProvider";
import { useEffect } from "react";
import { useFormik } from "formik";
import { SharedForm, SharedInput } from "../../../shared/components/common";

function FormSaveVehicle({vehicle, setBeforeSave, ...props}) {
    const {setModalData} = useModal();
    const initialValues = {
        id: vehicle?.id || 0,
        name: vehicle?.name || null,
        description: vehicle?.description || null,
        licensePlate: vehicle?.licensePlate || null,
        loadCapacity: vehicle?.loadCapacity || null
    }

    const formik = useFormik({
		initialValues: initialValues,
		validationSchema: vehicleValidationSchema,
		onSubmit: (values) => {},
	});

    // Sync form data with ModalProvider
    useEffect(() => {
        setModalData(formik.values);
    }, [formik.values, setModalData]);

    // BeforSave: validate
    useEffect(() => {
        if (setBeforeSave) {
            setBeforeSave(() => formik.submitForm());
        }
    }, [setBeforeSave, formik]);

    return (
        <SharedForm.FormBody>
            {/* Name */}
            <SharedForm.FormBodyItem>
                <SharedInput.Label forName="name">Name*</SharedInput.Label>
                <SharedInput.Text
                        name="name"
                        placeholder="Vehicle name*"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                        error={formik.touched.name && formik.errors.name}
                    />
            </SharedForm.FormBodyItem>

            <SharedForm.FormBodyItem>
                <SharedInput.Label forName="licensePlate">License Plate*</SharedInput.Label>
                <SharedInput.Text
                        name="licensePlate"
                        placeholder="Vehicle license plate*"
                        value={formik.values.licensePlate}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.licensePlate && formik.errors.licensePlate}
                    />
            </SharedForm.FormBodyItem>

            <SharedForm.FormBodyItem>
                <SharedInput.Label forName="loadCapacity">Load Capacity (Kg)*</SharedInput.Label>
                <SharedInput.Text
                        type="number"
                        name="loadCapacity"
                        placeholde="Vehicle load capacity (Kg)*"
                        value={formik.values.loadCapacity}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.loadCapacity && formik.errors.loadCapacity}
                    />
            </SharedForm.FormBodyItem>

            <SharedForm.FormBodyItem>
                <SharedInput.Label forName="description">Description*</SharedInput.Label>
                <SharedInput.TextAreaCustom
					name="description"
					placeholder="Vehicle description*"
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.description}
					error={formik.touched.description && formik.errors.description}
				/>
            </SharedForm.FormBodyItem>	
        </SharedForm.FormBody>
    )
}

export {FormSaveVehicle};