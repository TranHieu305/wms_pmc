import { useModal } from "../../../shared/components/ModalProvider";
import { notificationHelper } from "../../../shared/utils/notificationHelper";
import { useNavigate } from "react-router-dom";
import { Modal } from "antd";
import { Button } from "antd";
import { SharedBtn } from "../../../shared/components/common";
import shipmentApi from "../api/shipmentApi";
import { FormCreateShipment, FormCreateShipmentVrp } from "./ShipmentForm";

function ShipmentCreateBtn({...props}) {
    const { showModal } = useModal(); 
    const navigate = useNavigate();

    const handleSave = (data) => {
        shipmentApi.create(data)
            .then((response) => {
                notificationHelper.showSuccessNotification({ description: "Successfully created shipment" });
                navigate(0);
                window.open("/shipments/" + response.data.data.id, "_blank", "noopener,noreferrer");
            })
            .catch((err) => {
                notificationHelper.showErrorNotification({ description: "Cannot create shipment" });
            });
    }

    const handleClick = () => {
        let beforeSaveOrder;

        showModal({
            title: "Create new shipment",
            body: (
            <FormCreateShipment 
                setBeforeSave={(callback) => {beforeSaveOrder = callback;}}
                />),
            beforeSaveCallback: () => beforeSaveOrder(),
            onSave: handleSave,
            widthModal: "large"
        })
    }

    return <SharedBtn.BtnSave onClick={handleClick} {...props} ></SharedBtn.BtnSave>
}

function ShipmentBtnApprove({shipment, ...props}) {
    const navigate = useNavigate();

    const onProcess = (shipment) => {
        shipmentApi.approve(shipment.id)
            .then((response) => {
                notificationHelper.showSuccessNotification({ description: "Successfully approve shipment" });
                setTimeout(() => navigate(0), 1000);
            })
            .catch((err) => {
                notificationHelper.showErrorNotification({ description: "Cannot approve shipment" });
            });
    };

    const openConfirmModal = () => {
        Modal.confirm({
			title: "Confirm action",
			content: <div>Confirm to approve shipment <b>{shipment.name}</b></div>,
			onOk: () => onProcess(shipment),
		});
    }

    return <Button onClick={openConfirmModal} {...props}>Approve</Button>
}

function ShipmentBtnReject({shipment, ...props}) {
    const navigate = useNavigate();

    const onProcess = (shipment) => {
        shipmentApi.reject(shipment.id)
            .then((response) => {
                notificationHelper.showSuccessNotification({ description: "Successfully reject shipment" });
                setTimeout(() => navigate(0), 1000);
            })
            .catch((err) => {
                notificationHelper.showErrorNotification({ description: "Cannot reject shipment" });
            });
    };

    const openConfirmModal = () => {
        Modal.confirm({
			title: "Confirm action",
			content: <div>Confirm to reject shipment <b>{shipment.name}</b></div>,
			onOk: () => onProcess(shipment),
		});
    }

    return <Button onClick={openConfirmModal} {...props}>Reject</Button>
}

function ShipmentBtnDelete({shipment}) {
    const navigate = useNavigate();

    const onDelete = (shipment) => {
        shipmentApi.deleteShipment(shipment)
            .then((response) => {
                notificationHelper.showSuccessNotification({ description: "Successfully delete shipment" });
                setTimeout(() => navigate(0), 1000);
            })
            .catch((err) => {
                notificationHelper.showErrorNotification({ message: "Cannot delete shipment", description: err.response.data.message });
            });
    }

    const openConfirmModal = () => {
        Modal.confirm({
			title: "Confirm delete",
			content: <div>Do you really want to delete shipment: <b>{shipment.name}</b> ?</div>,
			onOk: () => onDelete(shipment),
		});
    }

    return <SharedBtn.BtnDelete onClick={openConfirmModal}/>
}

function ShipmentBtnMarkInTransit({shipment, ...props}) {
    const navigate = useNavigate();

    const onProcess = (shipment) => {
        shipmentApi.markAsInTransit(shipment.id)
            .then((response) => {
                notificationHelper.showSuccessNotification({ description: "Successfully update shipment" });
                setTimeout(() => navigate(0), 1000);
            })
            .catch((err) => {
                notificationHelper.showErrorNotification({ description: "Cannot update shipment" });
            });
    };

    const openConfirmModal = () => {
        Modal.confirm({
			title: "Confirm action",
			content: <div>Confirm to mark shipment <b>{shipment.name}</b> as in transit</div>,
			onOk: () => onProcess(shipment),
		});
    }

    return <Button onClick={openConfirmModal} type="dash" {...props}>Mark as in transit</Button>
}


function ShipmentBtnMarkAsCompleted({shipment, ...props}) {
    const navigate = useNavigate();

    const onProcess = (shipment) => {
        shipmentApi.markAsCompleted(shipment.id)
            .then((response) => {
                notificationHelper.showSuccessNotification({ description: "Successfully update shipment" });
                setTimeout(() => navigate(0), 1000);
            })
            .catch((err) => {
                notificationHelper.showErrorNotification({ description: "Cannot update shipment" });
            });
    };

    const openConfirmModal = () => {
        Modal.confirm({
			title: "Confirm action",
			content: <div>Confirm to mark shipment <b>{shipment.name}</b> as completed</div>,
			onOk: () => onProcess(shipment),
		});
    }

    return <Button onClick={openConfirmModal} type="dash" {...props}>Mark as completed</Button>
}

function ShipmentVrpBtn({...props}) {
    const { showModal } = useModal(); 
    const navigate = useNavigate();

    const handleSave = (data) => {
        shipmentApi.create(data)
            .then((response) => {
                notificationHelper.showSuccessNotification({ description: "Successfully created shipment" });
                navigate(0);
                window.open("/shipments/" + response.data.data.id, "_blank", "noopener,noreferrer");
            })
            .catch((err) => {
                notificationHelper.showErrorNotification({ description: "Cannot create shipment" });
            });
    }

    const handleClick = () => {
        let beforeSaveOrder;

        showModal({
            title: "Create new shipment use recommendation",
            body: (
            <FormCreateShipmentVrp 
                setBeforeSave={(callback) => {beforeSaveOrder = callback;}}
                />),
            beforeSaveCallback: () => beforeSaveOrder(),
            onSave: handleSave,
            widthModal: "large"
        })
    }

    return <SharedBtn.BtnSave onClick={handleClick} label="Recommendation" {...props} ></SharedBtn.BtnSave>
}

export {
    ShipmentCreateBtn,
    ShipmentBtnApprove,
    ShipmentBtnReject,
    ShipmentBtnDelete,
    ShipmentBtnMarkAsCompleted,
    ShipmentBtnMarkInTransit,
    ShipmentVrpBtn
}