import { useModal } from "../../../shared/components/ModalProvider";
import { SharedBtn } from "../../../shared/components/common";
import vehicleApi from "../api/vehicleApi";
import { notificationHelper } from "../../../shared/utils/notificationHelper";
import { useNavigate } from "react-router-dom";
import { Modal } from "antd";
import { FormSaveVehicle } from "./VehicleForm";

function VehicleBtnAdd() {
    const { showModal } = useModal(); 
    const navigate = useNavigate();

    const handleSave = (data) => {
        vehicleApi.saveVehicle(data)
            .then((response) => {
                notificationHelper.showSuccessNotification({ description: "Successfully created vehicle" });
                setTimeout(() => navigate(0), 1000);
            })
            .catch((err) => {
                notificationHelper.showErrorNotification({ description: "Cannot created vehicle" });
            });
    }

    const handleClick = () => {
        let beforeSaveOrder;

        showModal({
            title: "Create new vehicle",
            body: (<FormSaveVehicle
                setBeforeSave={(callback) => {beforeSaveOrder = callback;}}
                />),
            onSave: handleSave,
            beforeSaveCallback: () => beforeSaveOrder(),
            widthModal: "medium"
        })
    }

    return <SharedBtn.BtnSave label="Add vehicle" onClick={handleClick}/>
}

function VehicleBtnEdit({vehicle, ...props}) {
    const { showModal } = useModal(); 
    const navigate = useNavigate();

    const handleSave = (data) => {
        vehicleApi.editVehicle(data)
            .then((response) => {
                notificationHelper.showSuccessNotification({ description: "Successfully updated vehicle" });
                setTimeout(() => navigate(0), 1000);
            })
            .catch((err) => {
                notificationHelper.showErrorNotification({ description: "Cannot update vehicle" });
            });
    }

    const handleClick = () => {
        let beforeSaveOrder;

        showModal({
            title: <div>Edit vehicle: {vehicle.name}</div>,
            body: (
            <FormSaveVehicle
                vehicle={vehicle}
                setBeforeSave={(callback) => {beforeSaveOrder = callback;}}
                />
            ),            
            beforeSaveCallback: () => beforeSaveOrder(),
            onSave: handleSave
        })
    }

    return <SharedBtn.BtnEdit label="Edit" onClick={handleClick} {...props}/>
}

function VehicleBtnDelete({vehicle}) {
    const navigate = useNavigate();

    const onDelete = (vehicle) => {
        vehicleApi.deleteVehicle(vehicle)
            .then((response) => {
                notificationHelper.showSuccessNotification({ description: "Successfully delete vehicle" });
                setTimeout(() => navigate(0), 1000);
            })
            .catch((err) => {
                notificationHelper.showErrorNotification({ description: "Cannot delete vehicle" });
            });
    }

    const openConfirmModal = () => {
        Modal.confirm({
			title: "Confirm delete",
			content: <div>Do you really want to delete vehicle: <b>{vehicle.name}</b> ?</div>,
			onOk: () => onDelete(vehicle),
		});
    }

    return <SharedBtn.BtnDelete onClick={openConfirmModal}/>
}

export {
    VehicleBtnAdd, 
    VehicleBtnEdit, 
    VehicleBtnDelete
};