import { useModal } from "../../../shared/components/ModalProvider";
import { SharedBtn} from "../../../shared/components/common";
import { notificationHelper } from "../../../shared/utils/notificationHelper";
import { useNavigate } from "react-router-dom";
import orderApi from "../api/orderApi";
import { FormAddOrderItem, FormSaveOrder, FormUpdateOrder } from "./OrderForm";
import { Button, Modal } from "antd";

function OrderBtnSave({...props}) {
    const { showModal } = useModal(); 
    const navigate = useNavigate();

    const handleSave = (data) => {
        orderApi.saveOrder(data)
            .then((response) => {
                notificationHelper.showSuccessNotification({ description: "Successfully created order" });
                navigate(0);
                // window.open("/orders/" + response.data.data.id, "_blank", "noopener,noreferrer");
            })
            .catch((err) => {
                notificationHelper.showErrorNotification({ description: "Cannot create order" });
            });
    }

    const handleClick = () => {
        let beforeSaveOrder;

        showModal({
            title: "Create new order",
            body: (
                <FormSaveOrder 
                    setBeforeSave={(callback) => {beforeSaveOrder = callback;}}
                    />
                ),
            beforeSaveCallback: () => beforeSaveOrder(),
            onSave: handleSave,
            widthModal: "large"
        })
    }

    return <SharedBtn.BtnSave label="Add new" onClick={handleClick} {...props}/>
}

function OrderBtnUpdate({order, ...props}) {
    const { showModal } = useModal(); 
    const navigate = useNavigate();

    const handleSave = (data) => {
        orderApi.updateOrder(data)
            .then((response) => {
                notificationHelper.showSuccessNotification({ description: "Successfully updated order" });
                navigate(0);
            })
            .catch((err) => {
                notificationHelper.showErrorNotification({ description: "Cannot update order" });
            });
    }

    const handleClick = () => {
        showModal({
            title: <div>Edit order: {order.name}</div>,
            body: (<FormUpdateOrder order={order} />),
            onSave: handleSave,
            widthModal: "large"
        })
    }

    return <SharedBtn.BtnEdit onClick={handleClick} {...props}/>
}

function OrderBtnAddItem({order, ...props}) {
    const { showModal } = useModal(); 
    const navigate = useNavigate();

    const handleSave = (data) => {
        orderApi.addOrderItem(order, data)
            .then((response) => {
                navigate(0);
                notificationHelper.showSuccessNotification({ description: "Successfully update order" });
            })
            .catch((err) => {
                notificationHelper.showErrorNotification({ description: "Cannot update order" });
            });
    }

    const handleClick = () => {
        showModal({
            title: "Add item order",
            body: (<FormAddOrderItem order={order} />),
            onSave: handleSave,
            widthModal: "medium"
        })
    }

    return <SharedBtn.BtnSave label="Add item" onClick={handleClick} {...props}/>
}

function OrderBtnDelete({order}) {
    const navigate = useNavigate();

    const onDelete = (order) => {
        orderApi.deleteOrder(order)
            .then((response) => {
                notificationHelper.showSuccessNotification({ description: "Successfully delete order" });
                setTimeout(() => navigate(0), 1000);
            })
            .catch((err) => {
                notificationHelper.showErrorNotification({ message: "Cannot delete order", description: err.response.data.message });
            });
    }

    const openConfirmModal = () => {
        Modal.confirm({
			title: "Confirm delete",
			content: <div>Do you really want to delete order: <b>{order.name}</b> ?</div>,
			onOk: () => onDelete(order),
		});
    }

    return <SharedBtn.BtnDelete onClick={openConfirmModal}/>
}

function OrderBtnMarkComplete({order, ...props}) {
    const navigate = useNavigate();

    const onProcess = (order) => {
        orderApi.markAsCompleted(order.id)
            .then((response) => {
                notificationHelper.showSuccessNotification({ description: "Successfully update order" });
                setTimeout(() => navigate(0), 1000);
            })
            .catch((err) => {
                notificationHelper.showErrorNotification({ description: "Cannot update order" });
            });
    };

    const openConfirmModal = () => {
        Modal.confirm({
			title: "Confirm action",
			content: <div>Confirm to mark order <b>{order.name}</b> as completed</div>,
			onOk: () => onProcess(order),
		});
    }

    return <Button onClick={openConfirmModal} {...props}>Mark as completed</Button>
}

function OrderBtnApprove({order, ...props}) {
    const navigate = useNavigate();

    const onProcess = (order) => {
        orderApi.approve(order.id)
            .then((response) => {
                notificationHelper.showSuccessNotification({ description: "Successfully approve order" });
                setTimeout(() => navigate(0), 1000);
            })
            .catch((err) => {
                notificationHelper.showErrorNotification({ description: "Cannot approve order" });
            });
    };

    const openConfirmModal = () => {
        Modal.confirm({
			title: "Confirm action",
			content: <div>Confirm to approve order <b>{order.name}</b></div>,
			onOk: () => onProcess(order),
		});
    }

    return <Button onClick={openConfirmModal} {...props}>Approve</Button>
}

function OrderBtnReject({order, ...props}) {
    const navigate = useNavigate();

    const onProcess = (order) => {
        orderApi.reject(order.id)
            .then((response) => {
                notificationHelper.showSuccessNotification({ description: "Successfully reject order" });
                setTimeout(() => navigate(0), 1000);
            })
            .catch((err) => {
                notificationHelper.showErrorNotification({ description: "Cannot reject order" });
            });
    };

    const openConfirmModal = () => {
        Modal.confirm({
			title: "Confirm action",
			content: <div>Confirm to reject order <b>{order.name}</b></div>,
			onOk: () => onProcess(order),
		});
    }

    return <Button onClick={openConfirmModal} {...props}>Reject</Button>
}


export {
    OrderBtnSave,
    OrderBtnUpdate,
    OrderBtnDelete,
    OrderBtnAddItem,
    OrderBtnApprove,
    OrderBtnReject,
    OrderBtnMarkComplete
}