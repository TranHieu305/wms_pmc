import { useModal } from "../../../shared/components/ModalProvider";
import { useFormik } from "formik";
import { validationWarehouseSchema } from "../untils/validation";
import { SharedBtn, SharedForm, SharedInput } from "../../../shared/components/common";
import { useEffect } from "react";
import warehouseApi from "../api/warehouseApi";
import { notificationHelper } from "../../../shared/utils/notificationHelper";
import { useNavigate } from "react-router-dom";

function BtnSaveWarehouse({warehouse}) {
    const { showModal } = useModal(); 
    const navigate = useNavigate();

    const handleSave = (data) => {
        warehouseApi.saveWarehouse(data)
            .then((response) => {
                notificationHelper.showSuccessNotification({ description: "Successfully created warehouse" });
                console.log(response.data.data.id);
                setTimeout(() => navigate("/warehouses" + response.data.data.id), 1000);
            })
            .catch((err) => {
                notificationHelper.showErrorNotification({ description: "Cannot created warehouse" });
            });
    }

    const handleClick = () => {
        showModal({
            title: "Create new warehouse",
            body: (<FormBodySaveWarehouse />),
            onSave: handleSave
        })
    }

    return <SharedBtn.BtnSave handleClick={handleClick}/>
}

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
                <SharedInput.Label forName="description">Description*</SharedInput.Label>
                <SharedInput.Text
					name="description"
					placeholder="Warehouse description*"
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.description}
					error={formik.touched.description && formik.errors.description}
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
        </SharedForm.FormBody>
    )
}

export default BtnSaveWarehouse;