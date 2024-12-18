import { Dropdown } from "antd";
import { SharedBtn } from "../../../shared/components/common";
import { BatchBtnMarkAsDelivered } from "./BatchButton";

function BatchAction({batch, ...props}) {
    const items = [
        {
            key: '1',
            label: <BatchBtnMarkAsDelivered batch={batch} type="dash"/>,
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

export default BatchAction;