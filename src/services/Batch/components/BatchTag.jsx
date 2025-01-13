import { Tag } from "antd";
import Enum from "../../../shared/utils/enum";

function BatchStatusTag({status}) {
    let tag;
    switch (status) {
        case Enum.BatchStatus.PENDING_APPROVAL:
            tag = <Tag color="default">{Enum.BatchStatus.PENDING_APPROVAL}</Tag>;
            break;
        case Enum.BatchStatus.REJECTED:
                tag = <Tag color="error">{Enum.BatchStatus.REJECTED}</Tag>;
                break;
        case Enum.BatchStatus.PENDING:
            tag = <Tag color="processing">{Enum.BatchStatus.PENDING}</Tag>
            break;
        case Enum.BatchStatus.PACKING:
            tag = <Tag color="blue">{Enum.BatchStatus.PACKING}</Tag>
            break;
        case Enum.BatchStatus.PACKED:
            tag = <Tag color="blue">{Enum.BatchStatus.PACKED}</Tag>
            break;
        case Enum.BatchStatus.IN_TRANSIT:
            tag = <Tag color="orange">{Enum.BatchStatus.IN_TRANSIT}</Tag>
            break;
        case Enum.BatchStatus.DELIVERED:
            tag = <Tag color="lime">{Enum.BatchStatus.DELIVERED}</Tag>
            break;
        case Enum.BatchStatus.COMPLETED:
                tag = <Tag color="success">{Enum.BatchStatus.COMPLETED}</Tag>
                break;
        default:
            tag = <Tag color="default">NO STATUS</Tag>;
    }

    return tag;
}

function BatchItemStatusTag({status}) {
    let tag;
    switch (status) {
        case Enum.BatchItemStatus.PENDING:
            tag = <Tag color="default">{Enum.BatchItemStatus.PENDING}</Tag>
            break;
        case Enum.BatchItemStatus.COMPLETED:
            tag = <Tag color="lime">{Enum.BatchItemStatus.COMPLETED}</Tag>
            break;
        default:
            tag = <Tag color="default">{Enum.BatchItemStatus.PENDING}</Tag>
    }

    return tag;
}

export {BatchStatusTag, BatchItemStatusTag}