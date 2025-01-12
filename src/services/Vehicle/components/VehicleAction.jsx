import { Dropdown } from "antd";
import { SharedBtn } from "../../../shared/components/common";
import vehicleActionPermission from "../utils/actionPermission";
import { VehicleBtnDelete, VehicleBtnEdit } from "./VehicleButton";

function VehicleAction({vehicle, ...props}) {
    let items = getActionItems(vehicle);
    
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

const getActionItems = (vehicle) => {
    let actionItems = [];
    if (vehicleActionPermission.canEdit) {
        actionItems.push({
            key: 'edit' + vehicle.id,
            label: <VehicleBtnEdit vehicle={vehicle} key={vehicle.id} type="dash"/>,
        });
        actionItems.push({
            key: 'delete' + vehicle.id,
            label: <VehicleBtnDelete vehicle={vehicle} key={vehicle.id} type="dash"/>,
        });
    }

    if (actionItems.length === 0) {
        actionItems = [
            {
                key: 'no-action' + vehicle.id,
                label: "No action",
            },
        ]
    }
    return actionItems;
}

export default VehicleAction;