import { Dropdown } from "antd";
import { SharedBtn } from "../../../shared/components/common";
import { BatchBtnApprove, BatchBtnDelete, BatchBtnMarkAsDelivered, BatchBtnReject, BatchBtnUpdate } from "./BatchButton";
import batchActionPermission from "../utils/actionPermission";

function BatchAction({batch, ...props}) {
    let items = getActionItems(batch);
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

const getActionItems = (batch) => {
    let actionItems = [];
    if (batchActionPermission.canApprove(batch)) {
        actionItems.push({
            key: 'approve' + batch.id,
            label: <BatchBtnApprove batch={batch} key={batch.id} type="dash"/>,
        });
        actionItems.push({
            key: 'reject' + batch.id,
            label: <BatchBtnReject batch={batch} key={batch.id} type="dash"/>,
        });
    }

    if (batchActionPermission.canUpdate(batch)) {
        actionItems.push( {
            key: 'update' + batch.id,
            label: <BatchBtnUpdate batch={batch} key={batch.id}/>,
        });
    }
    if (batchActionPermission.canDelete(batch)) {
        actionItems.push( {
            key: 'delete' + batch.id,
            label: <BatchBtnDelete batch={batch}/>,
        });
    }
    if (batchActionPermission.canMarkAsDelivered(batch)) {
        actionItems.push({
            key: 'mark-complete' + batch.id,
            label: <BatchBtnMarkAsDelivered batch={batch} type="dash"/>,
        });
    }
    
    if (actionItems.length === 0) {
        actionItems = [
            {
                key: 'no-action' + batch.id,
                label: "No action",
            },
        ]
    }
    return actionItems;
}

export default BatchAction;