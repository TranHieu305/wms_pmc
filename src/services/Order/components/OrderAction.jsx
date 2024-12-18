import { Dropdown } from "antd";
import { SharedBtn } from "../../../shared/components/common";
import { BatchBtnCreateFromOrder } from "../../Batch/components/BatchButton";
import { OrderBtnDelete, OrderBtnUpdate } from "./OrderButton";

function OrderAction({order, ...props}) {
    const items = [
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