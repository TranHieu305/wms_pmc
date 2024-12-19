import { Dropdown } from "antd";
import { SharedBtn } from "../../../shared/components/common";
import { OrderItemBtnDelete, OrderItemBtnUpdate } from "./OrderItemButton";

function OrderItemAction({item, ...props}) {
    const items = [
        {
            key: 'update' + item.id,
            label: <OrderItemBtnUpdate item={item} key={item.id}/>,
        },
        {
            key: 'delete' + item.id,
            label: <OrderItemBtnDelete item={item} key={item.id}/>,
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

export default OrderItemAction