import { Dropdown } from "antd";
import { SharedBtn } from "../../../shared/components/common";

function OrderAction({order, ...props}) {
    const items = [
        // {
        //     key: '1',
        //     label: <Order product={product} />,
        // },
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