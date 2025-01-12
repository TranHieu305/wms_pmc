import Enum from "../../../shared/utils/enum";
import { Tag } from "antd";

function VehicleStatusTag({status}) {
    let tag;
    switch (status) {
        case Enum.VehicleStatus.AVAILABLE:
            tag = <Tag color="processing">{Enum.VehicleStatus.AVAILABLE}</Tag>
            break;
        case Enum.VehicleStatus.IN_TRANSIT:
            tag = <Tag color="orange">{Enum.VehicleStatus.IN_TRANSIT}</Tag>
            break;
        default:
            tag = <Tag color="default">NO STATUS</Tag>
    }

    return tag;
}

export default VehicleStatusTag; 