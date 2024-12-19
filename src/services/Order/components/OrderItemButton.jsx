import { useModal } from "../../../shared/components/ModalProvider";
import { useFormik } from "formik";
import { SharedBtn, SharedForm, SharedInput } from "../../../shared/components/common";
import { useEffect } from "react";
import { notificationHelper } from "../../../shared/utils/notificationHelper";
import { useNavigate } from "react-router-dom";
import { Modal } from "antd";
import orderItemApi from "../api/orderItemApi";
import { orderItemUpdateValidationSchema } from "../utils/validation";

function OrderItemBtnUpdate({item, ...props}) {
    const { showModal } = useModal(); 
    const navigate = useNavigate();

    const handleSave = (data) => {
        orderItemApi.updateItem(data)
            .then((response) => {
                notificationHelper.showSuccessNotification({ description: "Successfully updated order item" });
                setTimeout(() => navigate(0), 1000);
            })
            .catch((err) => {
                notificationHelper.showErrorNotification({ description: "Cannot update order item" });
            });
    }

    const handleClick = () => {
        showModal({
            title: <div>Edit item: {item.product?.name}</div>,
            body: (<FormEditItem item={item}/>),
            onSave: handleSave
        })
    }

    return <SharedBtn.BtnEdit onClick={handleClick} {...props}/>
}

function FormEditItem({item}) {
    const {setModalData} = useModal();

    const initialValues = {
		id: item?.id || 0,
        quantity: item?.quantity || 0
	};

    const formik = useFormik({
		initialValues: initialValues,
		validationSchema: orderItemUpdateValidationSchema,
		onSubmit: (values) => {},
	});

    // Sync form data with ModalProvider
    useEffect(() => {
        setModalData(formik.values);
    }, [formik.values, setModalData]);

    return (
        <SharedForm.FormBody>
            {/* Product */}
            <SharedForm.FormBodyItem>
                <SharedInput.Label forName="name">Product</SharedInput.Label>
                <SharedInput.Text
                        value={item.product?.name || "---"}
                        disabled
                    />
            </SharedForm.FormBodyItem>

            <SharedForm.FormBodyItem>
                <SharedInput.Label forName="name">Unit</SharedInput.Label>
                <SharedInput.Text
                        value={item.product?.uom || "---"}
                        disabled
                    />
            </SharedForm.FormBodyItem>

            <SharedForm.FormBodyItem>
                <SharedInput.Label forName="quantity">Quantity</SharedInput.Label>
                <SharedInput.Text
                        type="number"
                        name="quantity"
                        value={formik.values.quantity}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.quantity && formik.errors.quantity}
                    />
            </SharedForm.FormBodyItem>
        </SharedForm.FormBody>
    )
}

function OrderItemBtnDelete({item}) {
    const navigate = useNavigate();

    const onDelete = (item) => {
        orderItemApi.deleteItem(item)
            .then((response) => {
                notificationHelper.showSuccessNotification({ description: "Successfully delete item" });
                setTimeout(() => navigate(0), 1000);
            })
            .catch((err) => {
                notificationHelper.showErrorNotification({ message: "Cannot delete item", description: err.response.data.message });
            });
    }

    const openConfirmModal = () => {
        Modal.confirm({
			title: "Confirm delete",
			content: <div>Do you really want to delete item: <b>{item.product?.name}</b> ?</div>,
			onOk: () => onDelete(item),
		});
    }

    return <SharedBtn.BtnDelete onClick={openConfirmModal}/>
}

export {
    OrderItemBtnDelete,
    OrderItemBtnUpdate
}