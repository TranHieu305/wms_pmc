import { useModal } from "../../../shared/components/ModalProvider";
import { SharedBtn} from "../../../shared/components/common";
import { notificationHelper } from "../../../shared/utils/notificationHelper";
import { useNavigate } from "react-router-dom";
import orderApi from "../api/orderApi";
import { FormSaveOrder } from "./OrderForm";

function OrderBtnSave({...props}) {
    const { showModal } = useModal(); 
    const navigate = useNavigate();

    const handleSave = (data) => {
        orderApi.saveOrder(data)
            .then((response) => {
                notificationHelper.showSuccessNotification({ description: "Successfully created order" });
                navigate(0);
                window.open("/" + response.data.data.id, "_blank", "noopener,noreferrer");
            })
            .catch((err) => {
                notificationHelper.showErrorNotification({ description: "Cannot create order" });
            });
    }

    const handleClick = () => {
        showModal({
            title: "Create new order",
            body: (<FormSaveOrder />),
            onSave: handleSave,
            widthModal: "large"
        })
    }

    return <SharedBtn.BtnSave label="Add new" onClick={handleClick} {...props}/>
}

export {
    OrderBtnSave
}