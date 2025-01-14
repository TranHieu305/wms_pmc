import { useNavigate } from "react-router-dom";
import shipmentBatchApi from "../api/shipmentBatchApi";
import { notificationHelper } from "../../../shared/utils/notificationHelper123";
import { Button, Modal } from "antd";

function ShipmentBatchBtnMarkAsDelivered({shipmentBatch, ...props}) {
    const navigate = useNavigate();

    const onProcess = (shipmentBatch) => {
        shipmentBatchApi.markAsDelivered(shipmentBatch.id)
            .then((response) => {
                notificationHelper.showSuccessNotification({ description: "Successfully update shipment batch" });
                setTimeout(() => navigate(0), 1000);
            })
            .catch((err) => {
                notificationHelper.showErrorNotification({ description: "Cannot update shipment batch" });
            });
    };

    const openConfirmModal = () => {
        Modal.confirm({
			title: "Confirm action",
			content: <div>Confirm to mark shipment batch <b>{shipmentBatch.batch?.name}</b> as delivered</div>,
			onOk: () => onProcess(shipmentBatch),
		});
    }

    return <Button onClick={openConfirmModal} {...props}>Mark as delivered</Button>
}

export {ShipmentBatchBtnMarkAsDelivered}