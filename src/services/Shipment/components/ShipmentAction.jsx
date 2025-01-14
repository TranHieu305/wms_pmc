import { Dropdown } from "antd";
import { SharedBtn } from "../../../shared/components/common";
import shipmentActionPermission from "../utils/actionPermission";
import { ShipmentBtnApprove, ShipmentBtnDelete, ShipmentBtnReject } from "./ShipmentButton";

function ShipmentAction({shipment, ...props}) {
    let items = getActionItems(shipment);
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

const getActionItems = (shipment) => {
    let actionItems = [];
    if (shipmentActionPermission.canApprove(shipment)) {
        actionItems.push({
            key: 'approve' + shipment.id,
            label: <ShipmentBtnApprove shipment={shipment} key={shipment.id} type="dash"/>,
        });
        actionItems.push({
            key: 'reject' + shipment.id,
            label: <ShipmentBtnReject shipment={shipment} key={shipment.id} type="dash"/>,
        });
    }
    if (shipmentActionPermission.canDelete(shipment)) {
        actionItems.push( {
            key: 'delete' + shipment.id,
            label: <ShipmentBtnDelete shipment={shipment}/>,
        });
    }
    if (actionItems.length === 0) {
        actionItems = [
            {
                key: 'no-action' + shipment.id,
                label: "No action",
            },
        ]
    }
    return actionItems;
}

export default ShipmentAction;