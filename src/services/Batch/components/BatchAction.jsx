import { Dropdown } from "antd";
import { SharedBtn } from "../../../shared/components/common";
import { BatchBtnDelete, BatchBtnMarkAsDelivered, BatchBtnUpdate } from "./BatchButton";
import Enum from "../../../shared/utils/enum";

function BatchAction({batch, ...props}) {
    let items = [
        {
            key: 'no-action' + batch.id,
            label: "No action",
        },
    ];
    
    if (batch.status !== Enum.BatchStatus.DELIVERED) {
        items = [
          
            {
                key: 'update' + batch.id,
                label: <BatchBtnUpdate batch={batch}/>,
            },
            {
                key: 'delete' + batch.id,
                label: <BatchBtnDelete batch={batch}/>,
            },
        ];
    }

    if ((batch.inventoryAction === Enum.InventoryAction.IMPORT 
        && batch.status !== Enum.BatchStatus.DELIVERED) || 
        (batch.inventoryAction === Enum.InventoryAction.EXPORT
        && batch.status === Enum.BatchStatus.COMPLETED)
    ) {
        items.unshift(  
            {
            key: "mark-as-delivered" + batch.id,
            label: <BatchBtnMarkAsDelivered batch={batch} type="dash"/>,
            },
        )
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

export default BatchAction;