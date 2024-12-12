import { Dropdown } from "antd";
import { SharedBtn } from "../../../shared/components/common";
import { WarehouseBtnEdit, WarehousetBtnDelete } from "./WarehouseButton";

function WarehouseAction({warehouse, ...props}) {
    const items = [
        {
            key: '1',
            label: <WarehouseBtnEdit warehouse={warehouse} />,
        },
        {
            key: '2',
            label: <WarehousetBtnDelete warehouse={warehouse}/>,
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

export default WarehouseAction;