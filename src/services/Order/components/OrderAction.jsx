import { Dropdown } from "antd";
import { SharedBtn } from "../../../shared/components/common";
import { BatchBtnCreateFromOrder } from "../../Batch/components/BatchButton";
import { OrderBtnDelete, OrderBtnMarkComplete, OrderBtnUpdate } from "./OrderButton";
import Enum from "../../../shared/utils/enum";

function OrderAction({order, ...props}) {
    let items = [
        {
            key: 'no-action' + order.id,
            label: "No action",
        },
    ];
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