import { Dropdown } from "antd";
import { SharedBtn } from "../../../shared/components/common";
import { BatchBtnCreateFromOrder } from "../../Batch/components/BatchButton";
import { OrderBtnApprove, OrderBtnDelete, OrderBtnMarkComplete, OrderBtnReject, OrderBtnUpdate } from "./OrderButton";
import orderActionPermission from "../utils/actionPermission";

function OrderAction({order, ...props}) {
    let items = getActionItems(order);
    return (
        <Dropdown
            menu={{
                items,
            }}
            placement="bottomRight"
            {...props}
        >
            <SharedBtn.BtnAction />
        </Dropdown>
    );
}


const getActionItems = (order) => {
    let actionItems = [];
    if (orderActionPermission.canApprove(order)) {
        actionItems.push({
            key: 'approve' + order.id,
            label: <OrderBtnApprove order={order} key={order.id} type="dash"/>,
        });
        actionItems.push({
            key: 'reject' + order.id,
            label: <OrderBtnReject order={order} key={order.id} type="dash"/>,
        });
    }

    if (orderActionPermission.canCreateBatch(order)) {
        actionItems.push({
            key: 'create-branch' + order.id,
            label: <BatchBtnCreateFromOrder order={order} label="Create batch" type="dash" key={order.id}/>,
        });
    }

    if (orderActionPermission.canUpdate(order)) {
        actionItems.push( {
            key: 'update' + order.id,
            label: <OrderBtnUpdate order={order} key={order.id}/>,
        });
    }
    if (orderActionPermission.canDelete(order)) {
        actionItems.push( {
            key: 'delete' + order.id,
            label: <OrderBtnDelete order={order} key={order.id}/>,
        });
    }
    if (orderActionPermission.canMarkAsComplete(order)) {
        actionItems.push({
            key: 'mark-complete' + order.id,
            label: <OrderBtnMarkComplete order={order} label="Mark as completed" type="dash" key={order.id}/>,
        });
    }
    
    if (actionItems.length === 0) {
        actionItems = [
            {
                key: 'no-action' + order.id,
                label: "No action",
            },
        ]
    }
    return actionItems;
}

export default OrderAction;