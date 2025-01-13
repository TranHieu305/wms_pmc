import { useModal } from "../../../shared/components/ModalProvider";
import { notificationHelper } from "../../../shared/utils/notificationHelper";
import { useNavigate } from "react-router-dom";
import { Modal } from "antd";
import { Button } from "antd";
import { SharedBtn } from "../../../shared/components/common";
import shipmentApi from "../api/shipmentApi";
import { FormCreateShipment } from "./ShipmentForm";

function ShipmentCreateBtn({...props}) {
    const { showModal } = useModal(); 
    const navigate = useNavigate();

    const handleSave = (data) => {
        // shipmentApi.create(data)
        //     .then((response) => {
        //         notificationHelper.showSuccessNotification({ description: "Successfully created shipment" });
        //         navigate(0);
        //         window.open("/shipmentes/" + response.data.data.id, "_blank", "noopener,noreferrer");
        //     })
        //     .catch((err) => {
        //         notificationHelper.showErrorNotification({ description: "Cannot create shipment" });
        //     });
        console.log(data);
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

export {ShipmentCreateBtn}