import { Tag } from "antd";
import Enum from "../../../shared/utils/enum";

function ShipmentStatusTag({status}) {
    let tag;
    switch (status) {
        case Enum.ShipmentStatus.PENDING_APPROVAL:
            tag = <Tag color="default">{Enum.ShipmentStatus.PENDING_APPROVAL}</Tag>;
            break;
        case Enum.ShipmentStatus.REJECTED:
                tag = <Tag color="error">{Enum.ShipmentStatus.REJECTED}</Tag>;
                break;
        case Enum.ShipmentStatus.PENDING:
            tag = <Tag color="processing">{Enum.ShipmentStatus.PENDING}</Tag>
            break;
        case Enum.ShipmentStatus.COMPLETED:
            tag = <Tag color="lime">{Enum.ShipmentStatus.COMPLETED}</Tag>
            break;
        case Enum.ShipmentStatus.IN_TRANSIT:
            tag = <Tag color="orange">{Enum.ShipmentStatus.IN_TRANSIT}</Tag>
            break;
        default:
            tag = <Tag color="default">NO STATUS</Tag>;
    }

    return tag;
}

function ShipmentBatchStatusTag({status}) {
    let tag;
    switch (status) {
        case Enum.ShipmentBatchStatus.PACKED:
            tag = <Tag color="blue">{Enum.ShipmentBatchStatus.PACKED}</Tag>;
            break;
        case Enum.ShipmentBatchStatus.IN_TRANSIT:
                tag = <Tag color="orange">{Enum.ShipmentBatchStatus.IN_TRANSIT}</Tag>;
                break;
        case Enum.ShipmentBatchStatus.DELIVERED:
            tag = <Tag color="success">{Enum.ShipmentBatchStatus.DELIVERED}</Tag>
            break;
            default:
                tag = <Tag color="default">NO STATUS</Tag>;
        }
    return tag;
} 

export {ShipmentStatusTag, ShipmentBatchStatusTag}