import { useModal } from "../../../shared/components/ModalProvider";
import { useFormik } from "formik";
import { SharedBtn, SharedForm, SharedInput } from "../../../shared/components/common";
import { useEffect } from "react";
import { notificationHelper } from "../../../shared/utils/notificationHelper";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "antd";
import batchItemApi from "../api/batchItemApi";
import { batchItemUpdateValidationSchema } from "../utils/validation";

function BatchItemBtnUpdate({item, ...props}) {
    const { showModal } = useModal(); 
    const navigate = useNavigate();

    const handleSave = (data) => {
        batchItemApi.updateItem(data)
            .then((response) => {
                notificationHelper.showSuccessNotification({ description: "Successfully updated batch item" });
                setTimeout(() => navigate(0), 1000);
            })
            .catch((err) => {
                notificationHelper.showErrorNotification({ message: "Cannot update batch item", description: err.response.data.message });
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
    console.log(item);

    const {setModalData} = useModal();

    const initialValues = {
		id: item.id,
        quantity: item.quantity,
        weight: item.weight || 0,
	};

    const formik = useFormik({
		initialValues: initialValues,
		validationSchema: batchItemUpdateValidationSchema,
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

            <SharedForm.FormBodyItem>               
                <SharedInput.Label forName="weight">Weight(Kg)</SharedInput.Label>
                <SharedInput.Text
                        type="number"
                        name="weight"
                        value={formik.values.weight}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.weight && formik.errors.weight}
                    />
            </SharedForm.FormBodyItem>
        </SharedForm.FormBody>
    )
}

function BatchItemBtnDelete({item}) {
    const navigate = useNavigate();

    const onDelete = (item) => {
        batchItemApi.deleteItem(item)
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

function BatchItemBtnMarkComplete({item, batch, ...props}) {
    const navigate = useNavigate();

    if (!item.quantity || item.quantity === 0) {
        notificationHelper.showErrorNotification({ message: "Cannot delete item", description: "Please update item weight" });
    }

    const onProcess = (item) => {
        batchItemApi.markAsCompleted(batch.id, item.id)
            .then((response) => {
                notificationHelper.showSuccessNotification({ description: "Successfully delete item" });
                setTimeout(() => navigate(0), 1000);
            })
            .catch((err) => {
                notificationHelper.showErrorNotification({ message: "Cannot delete item", description: err.response.data.message });
            });
    }

    const openConfirmModal = () => {
    console.log(item);

        Modal.confirm({
			title: "Confirm delete",
			content: <div>Do you really want to mark item: <b>{item.product?.name}</b> as completed ?</div>,
			onOk: () => onProcess(item),
		});
    }

    return <Button onClick={openConfirmModal} {...props}>Mark as completed</Button>
}

export {
    BatchItemBtnUpdate, 
    BatchItemBtnDelete,
    BatchItemBtnMarkComplete
}
