import { Dropdown } from "antd";
import { SharedBtn } from "../../../shared/components/common";
import { BatchBtnCreateFromOrder } from "../../Batch/components/BatchButton";

function OrderAction({order, ...props}) {
    const items = [
        {
            key: '1',
            label: <BatchBtnCreateFromOrder order={order} label="Create batch" type="dash"/>,
        },
        // {
        //     key: '2',
        //     label: <ProductBtnDelete product={product}/>,
        // },
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