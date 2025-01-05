import { Dropdown } from "antd";
import { SharedBtn } from "../../../shared/components/common";
import { BatchBtnCreateFromOrder } from "../../Batch/components/BatchButton";
import { OrderBtnApprove, OrderBtnDelete, OrderBtnMarkComplete, OrderBtnReject, OrderBtnUpdate } from "./OrderButton";
import Enum from "../../../shared/utils/enum";
import actionHelper from "../../../shared/utils/actionHelper";

function OrderAction({order, ...props}) {
    let items = [];
    if (order.status === Enum.OrderStatus.COMPLETED || 
        order.status === Enum.OrderStatus.REJECTED) {
            items = [
                {
                    key: 'no-action' + order.id,
                    label: "No action",
                },
            ];
        }
    
    if (order.status !== Enum.OrderStatus.COMPLETED) {
        items = [
            {
                key: 'mark-complete' + order.id,
                label: <OrderBtnMarkComplete order={order} label="Mark as completed" type="dash" key={order.id}/>,
            },
            {
                key: 'create' + order.id,
                label: <BatchBtnCreateFromOrder order={order} label="Create batch" type="dash" key={order.id}/>,
            },
            {
                key: 'update' + order.id,
                label: <OrderBtnUpdate order={order} key={order.id}/>,
            },
            {
                key: 'delete' + order.id,
                label: <OrderBtnDelete order={order} key={order.id}/>,
            },
    
        ];
    }
    if (actionHelper.currentUserCanApprove(order)) {
        items.push({
            key: 'approve' + order.id,
            label: <OrderBtnApprove order={order} key={order.id} type="dash"/>,
        });
        items.push({
            key: 'reject' + order.id,
            label: <OrderBtnReject order={order} key={order.id} type="dash"/>,
        });
    }

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

export default OrderAction;