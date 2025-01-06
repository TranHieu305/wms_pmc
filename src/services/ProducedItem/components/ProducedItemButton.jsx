
import { useModal } from "../../../shared/components/ModalProvider";
import { notificationHelper } from "../../../shared/utils/notificationHelper";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "antd";
import producedItemApi from "../api/producedItemApi";
import { FormCreateFromBatchItem } from "./ProducedItemForm";

function ProducedItemCreateFromBatchItemBtn({...props}) {
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
                    />
                ),
            beforeSaveCallback: () => beforeSaveOrder(),
            onSave: handleSave,
        })
    }

    return <Button onClick={handleClick} {...props}>Add produced item</Button>
}

export {ProducedItemCreateFromBatchItemBtn}