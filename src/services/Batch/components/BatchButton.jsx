import { useModal } from "../../../shared/components/ModalProvider";
import { notificationHelper } from "../../../shared/utils/notificationHelper";
import { useNavigate } from "react-router-dom";
import batchApi from "../api/batchApi";
import { FormCreateFromOrder, FormUpdateBatch } from "./BatchForm";
import { Modal } from "antd";
import { Button } from "antd";
import { SharedBtn } from "../../../shared/components/common";

function BatchBtnCreateFromOrder({order, ...props}) {
    const { showModal } = useModal(); 
    const navigate = useNavigate();

    const handleSave = (data) => {
        batchApi.createFromOrder(data)
            .then((response) => {
                notificationHelper.showSuccessNotification({ description: "Successfully created batch" });
                navigate(0);
                window.open("/batches/" + response.data.data.id, "_blank", "noopener,noreferrer");
            })
            .catch((err) => {
                notificationHelper.showErrorNotification({ description: "Cannot create batch" });
            });
    }

    const handleClick = () => {
        showModal({
            title: "Create new batch",
            body: (<FormCreateFromOrder order={order} />),
            onSave: handleSave,
            widthModal: "large"
        })
    }

    return <Button onClick={handleClick} {...props}>Create batch</Button>
}

function BatchBtnMarkAsDelivered({batch, ...props}) {
    const navigate = useNavigate();

    const onProcess = (batch) => {
        batchApi.markAsDelivered(batch.id)
            .then((response) => {
                notificationHelper.showSuccessNotification({ description: "Successfully update batch" });
                setTimeout(() => navigate(0), 1000);
            })
            .catch((err) => {
                notificationHelper.showErrorNotification({ description: "Cannot update batch" });
            });
    };

    const openConfirmModal = () => {
        Modal.confirm({
			title: "Confirm action",
			content: <div>Confirm to mark batch <b>{batch.name}</b> as delivered</div>,
			onOk: () => onProcess(batch),
		});
    }

    return <Button onClick={openConfirmModal} {...props}>Mark as delivered</Button>
}

function BatchBtnDelete({batch}) {
    const navigate = useNavigate();

    const onDelete = (batch) => {
        batchApi.deleteBatch(batch)
            .then((response) => {
                notificationHelper.showSuccessNotification({ description: "Successfully delete batch" });
                setTimeout(() => navigate(0), 1000);
            })
            .catch((err) => {
                notificationHelper.showErrorNotification({ message: "Cannot delete batch", description: err.response.data.message });
            });
    }

    const openConfirmModal = () => {
        Modal.confirm({
			title: "Confirm delete",
			content: <div>Do you really want to delete batch: <b>{batch.name}</b> ?</div>,
			onOk: () => onDelete(batch),
		});
    }

    return <SharedBtn.BtnDelete onClick={openConfirmModal}/>
}

function BatchBtnUpdate({batch, ...props}) {
    const { showModal } = useModal(); 
    const navigate = useNavigate();

    const handleSave = (data) => {
        batchApi.updateBatch(data)
            .then((response) => {
                notificationHelper.showSuccessNotification({ description: "Successfully updated batch" });
                navigate(0);
            })
            .catch((err) => {
                notificationHelper.showErrorNotification({ description: "Cannot update batch" });
            });
    }

    const handleClick = () => {
        showModal({
            title: <div>Edit batch: {batch.name}</div>,
            body: (<FormUpdateBatch batch={batch} />),
            onSave: handleSave,
            widthModal: "medium"
        })
    }

    return <SharedBtn.BtnEdit onClick={handleClick} {...props}/>
}

export {
    BatchBtnCreateFromOrder, 
    BatchBtnMarkAsDelivered,
    BatchBtnDelete,
    BatchBtnUpdate
}