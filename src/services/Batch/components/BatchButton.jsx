import { useModal } from "../../../shared/components/ModalProvider";
import { SharedBtn} from "../../../shared/components/common";
import { notificationHelper } from "../../../shared/utils/notificationHelper";
import { useNavigate } from "react-router-dom";
import batchApi from "../api/batchApi";
import { FormCreateFromOrder } from "./BatchForm";
import { Modal } from "antd";
import { Button } from "antd";

function BatchBtnCreateFromOrder({order, ...props}) {
    const { showModal } = useModal(); 
    const navigate = useNavigate();

    const handleSave = (data) => {
        console.log(data);
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

    return <SharedBtn.BtnSave onClick={handleClick} {...props}/>
}

function BatchBtnMarkAsDelivered({batch}) {
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

    return <Button onClick={openConfirmModal}>Mark as delivered</Button>
}

export {BatchBtnCreateFromOrder, BatchBtnMarkAsDelivered}