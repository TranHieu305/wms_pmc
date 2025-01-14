import { Dropdown } from "antd";
import { SharedBtn } from "../../../shared/components/common";
import shipmentActionPermission from "../utils/actionPermission";
import { ShipmentBatchBtnMarkAsDelivered } from "./ShipmentBatchButton";

function ShipmentBatchAction({shipment, shipmentBatch, ...props}) {
    let items = getActionItems(shipment, shipmentBatch);
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

const getActionItems = (shipment, shipmentBatch) => {
    let actionItems = [];
   
    if (shipmentActionPermission.itemCanMarkDelivered(shipment, shipmentBatch)) {
        actionItems.unshift({
            key: 'mark-in-transit' + shipment.id,
            label: <ShipmentBatchBtnMarkAsDelivered shipmentBatch={shipmentBatch}/>,
        })
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

export default ShipmentBatchAction;