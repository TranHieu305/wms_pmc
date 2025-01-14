import { Dropdown } from "antd";
import { SharedBtn } from "../../../shared/components/common";
import { BatchItemBtnDelete, BatchItemBtnMarkComplete, BatchItemBtnUpdate } from "./BatchItemButton";
import { ProducedItemCreateFromBatchItemBtn } from "../../ProducedItem/components/ProducedItemButton";
import batchActionPermission from "../utils/actionPermission";

function BatchItemAction({batch, item, ...props}) {
    let items = [];
    
    if (batchActionPermission.itemCanEdit(batch, item)) {
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

    if (batchActionPermission.itemCanMarkComplete(batch, item)) {
        items.unshift(
            {
                key: 'mark-complete' + item.id,
                label: <BatchItemBtnMarkComplete batch={batch} item={item} key={item.id} type="dash" />,
            },
        )
    } 
    if (batchActionPermission.itemCanAddProduced(batch, item)) {
        items.unshift(
            {
                key: 'produce-' + item.id,
                label: <ProducedItemCreateFromBatchItemBtn batch={batch} batchItem={item} key={item.id} type="dash" />,
            },
        )
    }

    if (items.length === 0) {
        items = [
            {
                key: 'no-action' + batch.id,
                label: "No action",
            },
        ]
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

export default BatchItemAction;