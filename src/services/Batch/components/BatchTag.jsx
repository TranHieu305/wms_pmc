import { Tag } from "antd";
import Enum from "../../../shared/utils/enum";

function BatchStatusTag({status}) {
    let tag;
    switch (status) {
        case Enum.BatchStatus.PENDING:
            tag = <Tag color="default">{Enum.BatchStatus.PENDING}</Tag>
            break;
        case Enum.BatchStatus.PACKING:
            tag = <Tag color="blue">{Enum.BatchStatus.PACKING}</Tag>
            break;
        case Enum.BatchStatus.COMPLETED:
            tag = <Tag color="lime">{Enum.BatchStatus.COMPLETED}</Tag>
            break;
        case Enum.BatchStatus.IN_TRANSIT:
            tag = <Tag color="orange">{Enum.BatchStatus.IN_TRANSIT}</Tag>
            break;
        case Enum.BatchStatus.DELIVERED:
            tag = <Tag color="success">{Enum.BatchStatus.DELIVERED}</Tag>
            break;
        default:
            tag = <Tag color="default">{Enum.BatchStatus.PENDING}</Tag>
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