import { Dropdown } from "antd";
import { SharedBtn } from "../../../shared/components/common";
import { BatchItemBtnDelete, BatchItemBtnMarkComplete, BatchItemBtnUpdate } from "./BatchItemButton";
import Enum from "../../../shared/utils/enum";
import { ProducedItemCreateFromBatchItemBtn } from "../../ProducedItem/components/ProducedItemButton";

function BatchItemAction({batch, item, ...props}) {
    let items = [
        {
            key: 'no-action' + item.id,
            label: "No action",
        },
    ];
    
    if (item.status !== Enum.BatchItemStatus.COMPLETED && 
        batch.status !== Enum.BatchStatus.DELIVERED
    ) {
        items = [
          
            {
                key: 'update' + item.id,
                label: <BatchItemBtnUpdate item={item} key={item.id}/>,
            },
            {
                key: 'delete' + item.id,
                label: <BatchItemBtnDelete item={item} key={item.id}/>,
            },
    
        ];
    }

    if (batch.inventoryAction === Enum.InventoryAction.EXPORT &&
        item.status !== Enum.BatchItemStatus.COMPLETED ) {
        items.unshift(
            {
                key: 'mark-complete' + item.id,
                label: <BatchItemBtnMarkComplete batch={batch} item={item} key={item.id} type="dash" />,
            },
        )
    } 
    items.unshift(
        {
            key: 'produce-' + item.id,
            label: <ProducedItemCreateFromBatchItemBtn batch={batch} batchItem={item} key={item.id} type="dash" />,
        },
    )
    

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

export default BatchItemAction;