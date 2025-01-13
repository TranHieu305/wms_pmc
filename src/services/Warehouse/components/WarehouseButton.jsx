import { useModal } from "../../../shared/components/ModalProvider";
import { SharedBtn } from "../../../shared/components/common";
import warehouseApi from "../api/warehouseApi";
import { notificationHelper } from "../../../shared/utils/notificationHelper";
import { useNavigate } from "react-router-dom";
import { Modal } from "antd";
import FormBodySaveWarehouse from "./WarehouseForm";

function WarehouseBtnSave({warehouse}) {
    const { showModal } = useModal(); 
    const navigate = useNavigate();

    const handleSave = (data) => {
        warehouseApi.saveWarehouse(data)
            .then((response) => {
                notificationHelper.showSuccessNotification({ description: "Successfully created warehouse" });
                setTimeout(() => navigate(0), 1000);
            })
            .catch((err) => {
                notificationHelper.showErrorNotification({ description: "Cannot created warehouse" });
            });
    }

    const handleClick = () => {
        showModal({
            title: "Create new warehouse",
            body: (<FormBodySaveWarehouse />),
            onSave: handleSave,
            widthModal: "medium"
        })
    }

    return <SharedBtn.BtnSave label="Add new" onClick={handleClick}/>
}

function WarehouseBtnEdit({warehouse, ...props}) {
    const { showModal } = useModal(); 
    const navigate = useNavigate();

    const handleSave = (data) => {
        warehouseApi.editWarehouse(data)
            .then((response) => {
                notificationHelper.showSuccessNotification({ description: "Successfully updated warehouse" });
                setTimeout(() => navigate(0), 1000);
            })
            .catch((err) => {
                notificationHelper.showErrorNotification({ description: "Cannot update warehouse" });
            });
    }

    const handleClick = () => {
        showModal({
            title: <div>Edit warehouse: {warehouse.name}</div>,
            body: (<FormBodySaveWarehouse warehouse={warehouse}/>),
            onSave: handleSave,
            widthModal: "medium"
        })
    }

    return <SharedBtn.BtnEdit label="Edit" onClick={handleClick} {...props}/>
}




function WarehouseBtnDelete({warehouse}) {
    const navigate = useNavigate();

    const onDelete = (warehouse) => {
        warehouseApi.deleteWarehouse(warehouse)
            .then((response) => {
                notificationHelper.showSuccessNotification({ description: "Successfully delete warehouse" });
                setTimeout(() => navigate(0), 1000);
            })
            .catch((err) => {
                notificationHelper.showErrorNotification({ description: "Cannot delete warehouse" });
            });
    }

    const openConfirmModal = () => {
        Modal.confirm({
			title: "Confirm delete",
			content: <div>Do you really want to delete warehouse: <b>{warehouse.name}</b> ?</div>,
			onOk: () => onDelete(warehouse),
		});
    }

    return <SharedBtn.BtnDelete onClick={openConfirmModal}/>
}

export {
    WarehouseBtnSave, 
    WarehouseBtnEdit, 
    WarehouseBtnDelete
};