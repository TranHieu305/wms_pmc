import { useModal } from "../../../shared/components/ModalProvider";
import { useEffect } from "react";
import { useFormik } from "formik";
import { SharedForm, SharedInput } from "../../../shared/components/common";

function FormSavePartnerAddress({partner, partnerAddress, setBeforeSave}) {
    const {setModalData} = useModal();
    const initialValues = {
        id: partnerAddress?.id || 0,
        name: partnerAddress?.name || null,
        partnerId: partner?.id || 0,
        address: partnerAddress?.address || null,
        longitude: partnerAddress?.longitude || 0,
		latitude: partnerAddress?.latitude || 0,
    }

    const formik = useFormik({
		initialValues: initialValues,
		// validationSchema: vehicleValidationSchema,
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
            {/* Partner */}
            <SharedForm.FormBodyItem>
                <SharedInput.Label forName="name">Partner</SharedInput.Label>
                <SharedInput.Text
                    value={partner?.name}
                    disabled
                />
            </SharedForm.FormBodyItem>

            {/* Name */}
            <SharedForm.FormBodyItem>
                <SharedInput.Label forName="name">Name*</SharedInput.Label>
                <SharedInput.Text
                        name="name"
                        placeholder="Address name*"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                        error={formik.touched.name && formik.errors.name}
                    />
            </SharedForm.FormBodyItem>
				
            {/* Address */}
            <SharedForm.FormBodyItem>
                <SharedInput.Label forName="address">Location*</SharedInput.Label>
                <SharedInput.Location
                    onSelectLocation={(location) => {
                        formik.setFieldValue("address", location?.address);
                        formik.setFieldValue("longitude", location?.longitude);
                        formik.setFieldValue("latitude", location?.latitude);
                    }}
                    onBlur={formik.handleBlur}
                    value={formik.values.address}
                    error={formik.touched.address && formik.errors.address}
                >    
                </SharedInput.Location>
            </SharedForm.FormBodyItem>		
        </SharedForm.FormBody>
    )
}

export default FormSavePartnerAddress;