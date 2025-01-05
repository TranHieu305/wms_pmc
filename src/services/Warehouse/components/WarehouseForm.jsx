import { useFormik } from "formik";
import { validationWarehouseSchema } from "../utils/validation";

import { SharedForm, SharedInput } from "../../../shared/components/common";
import { useEffect } from "react";
import { useModal } from "../../../shared/components/ModalProvider";

function FormBodySaveWarehouse({warehouse, onSave}) {
    const {setModalData} = useModal();

    const initialValues = {
		id: warehouse?.id || 0,
		name: warehouse?.name || "",
		description: warehouse?.description || "",
		address: warehouse?.address || "",
		longitude: warehouse?.longitude || 0,
		latitude: warehouse?.latitude || 0,
		supervisorId: warehouse?.supervisorId || 1,
		status: warehouse?.status || true,
	};

    const formik = useFormik({
		initialValues: initialValues,
		validationSchema: validationWarehouseSchema,
		onSubmit: (values) => {},
	});

     // Sync form data with ModalProvider
    useEffect(() => {
        setModalData(formik.values);
    }, [formik.values, setModalData]);

    return (
        <SharedForm.FormBody>
            
            <SharedForm.FormBodyItem>
                <SharedInput.Label forName="name">Name*</SharedInput.Label>
                <SharedInput.Text
                        name="name"
                        placeholder="Warehouse name*"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                        error={formik.touched.name && formik.errors.name}
                    />
            </SharedForm.FormBodyItem>
				
            <SharedForm.FormBodyItem>
                <SharedInput.Label forName="address">Address*</SharedInput.Label>
                <SharedInput.Text
					name="address"
					placeholder="Warehouse address*"
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.address}
					error={formik.touched.address && formik.errors.address}
				/>
            </SharedForm.FormBodyItem>			

             <SharedForm.FormBodyItem>
                <SharedInput.Label forName="description">Description*</SharedInput.Label>
                <SharedInput.TextAreaCustom
					name="description"
					placeholder="Warehouse description*"
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.description}
					error={formik.touched.description && formik.errors.description}
				/>
            </SharedForm.FormBodyItem>	
            
            <SharedForm.FormBodyItem>
                <SharedInput.Label forName="description">Address*</SharedInput.Label>
                <SharedInput.Location>
                    
                </SharedInput.Location>
            </SharedForm.FormBodyItem>
        </SharedForm.FormBody>
    )
}

export default FormBodySaveWarehouse;