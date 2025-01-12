import { Dropdown } from "antd";
import { SharedBtn } from "../../../shared/components/common";
import { ProducedItemApprove, ProducedItemReject } from "./ProducedItemButton";
import producedItemActionPermission from "../utils/actionPermission";

function ProducedItemAction({producedItem, ...props}) {
    let items = getActionItems(producedItem);
    
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

const getActionItems = (item) => {
    let actionItems = [];
    if (producedItemActionPermission.canApprove(item)) {
        actionItems.push({
            key: 'approve' + item.id,
            label: <ProducedItemApprove item={item} key={item.id} type="dash"/>,
        });
        actionItems.push({
            key: 'reject' + item.id,
            label: <ProducedItemReject item={item} key={item.id} type="dash"/>,
        });
    }
    if (actionItems.length === 0) {
        actionItems = [
            {
                key: 'no-action' + item.id,
                label: "No action",
            },
        ]
    }
    return actionItems;
}

export default ProducedItemAction;