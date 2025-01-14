
import { useModal } from "../../../shared/components/ModalProvider";
import { notificationHelper } from "../../../shared/utils/notificationHelper123";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "antd";
import producedItemApi from "../api/producedItemApi";
import { FormCreateFromBatchItem } from "./ProducedItemForm";

function ProducedItemCreateFromBatchItemBtn({batch, batchItem,...props}) {
    const { showModal } = useModal(); 
    const navigate = useNavigate();

    const handleSave = (data) => {
        producedItemApi.createFromBatchItem(data)
            .then((response) => {
                notificationHelper.showSuccessNotification({ description: "Successfully created produced item" });
                navigate(0);
            })
            .catch((err) => {
                notificationHelper.showErrorNotification({ description: "Cannot create produced item" });
            });
    }

    const handleClick = () => {
        let beforeSaveOrder;

        showModal({
            title: "Create new produced item",
            body: (
                <FormCreateFromBatchItem 
                    setBeforeSave={(callback) => {beforeSaveOrder = callback;}}
                    batch={batch}
                    batchItem={batchItem}
                    />
                ),
            beforeSaveCallback: () => beforeSaveOrder(),
            onSave: handleSave,
            widthModal: 'medium'
        })
    }

    return <Button onClick={handleClick} {...props}>Add produced item</Button>
}

function ProducedItemApprove({item, ...props}) {
    const navigate = useNavigate();

    const onProcess = (item) => {
        producedItemApi.approve(item.id)
            .then((response) => {
                notificationHelper.showSuccessNotification({ description: "Successfully approve produced item" });
                setTimeout(() => navigate(0), 1000);
            })
            .catch((err) => {
                notificationHelper.showErrorNotification({ description: "Cannot approve produced item" });
            });
    };

    const openConfirmModal = () => {
        Modal.confirm({
			title: "Confirm action",
			content: <div>Confirm to approve produced item <b>{item.product?.name}</b></div>,
			onOk: () => onProcess(item),
		});
    }

    return <Button onClick={openConfirmModal} {...props}>Approve</Button>
}

function ProducedItemReject({item, ...props}) {
    const navigate = useNavigate();

    const onProcess = (item) => {
        producedItemApi.reject(item.id)
            .then((response) => {
                notificationHelper.showSuccessNotification({ description: "Successfully reject produced item" });
                setTimeout(() => navigate(0), 1000);
            })
            .catch((err) => {
                notificationHelper.showErrorNotification({ description: "Cannot reject produced item" });
            });
    };

    const openConfirmModal = () => {
        Modal.confirm({
			title: "Confirm action",
			content: <div>Confirm to reject produced item <b>{item.product?.name}</b></div>,
			onOk: () => onProcess(item),
		});
    }

    return <Button onClick={openConfirmModal} {...props}>Reject</Button>
}

export {
    ProducedItemCreateFromBatchItemBtn,
    ProducedItemApprove,
    ProducedItemReject
}