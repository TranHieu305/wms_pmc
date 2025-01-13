import { useFormik } from "formik";
import { validationWarehouseSchema } from "../utils/validation";

import { SharedForm, SharedInput } from "../../../shared/components/common";
import { useEffect, useState } from "react";
import { useModal } from "../../../shared/components/ModalProvider";
import { useSelector } from "react-redux";
import inputHelper from "../../../shared/utils/inputHelper";

function FormBodySaveWarehouse({warehouse, onSave}) {
    const {setModalData} = useModal();
    const users = useSelector((state) => state.users.userList);
    const loadingUsers = useSelector((state) => state.users.status === 'loading');
    const [supervisor, setSupervisor] = useState(inputHelper.covertIdsToUserMentions([warehouse?.supervisorId], users));

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
            {/* Name */}
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
				
            {/* Address */}
            <SharedForm.FormBodyItem>
                <SharedInput.Label forName="address">Address*</SharedInput.Label>
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

            {/* Supervisor */}
            <SharedForm.FormBodyItem>
                <SharedInput.Label forName="supervisorId">Supervisor*</SharedInput.Label>
                <SharedInput.UserMention
                    name="supervisorId"
                    placeholder="Please choose a supervisor"
                    loading={loadingUsers}
                    value={supervisor}
                    onChange={(value) => {
                        formik.setFieldValue("supervisorId", inputHelper.convertUserMentionsToIds(value, users)[0])
                        setSupervisor(value);
                    }}
                    onBlur={formik.handleBlur}
                    error={formik.touched.supervisorId && formik.errors.supervisorId}
                />
            </SharedForm.FormBodyItem>	

            {/* Description */}
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
            
           
        </SharedForm.FormBody>
    )
}

export default FormBodySaveWarehouse;