import { Dropdown } from "antd";
import { PWHBtnExport, PWHBtnImport } from "./ProductWarehouseHistoryButton";
import { SharedBtn } from "../../../shared/components/common";

function ProductWarehouseActionForWarehouse({warehouse, ...props}) {
    const items = [
        {
            key: '1',
            label: <PWHBtnImport warehouse={warehouse} />,
        },
        {
            key: '2',
            label: <PWHBtnExport warehouse={warehouse}/>,
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
        <SharedBtn.BtnSave label="Manage product"></SharedBtn.BtnSave>
    </Dropdown>
);
}

export {ProductWarehouseActionForWarehouse}

