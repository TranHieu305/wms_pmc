import { Tag } from "antd";
import Enum from "../../../shared/utils/enum";

function ProducedItemStatusTag({status}) {
    let tag;
    switch (status) {
        case Enum.ProducedItemStatus.PENDING_APPROVAL:
            tag = <Tag color="default">{Enum.ProducedItemStatus.PENDING_APPROVAL}</Tag>;
            break;
        case Enum.ProducedItemStatus.REJECTED:
                tag = <Tag color="error">{Enum.ProducedItemStatus.REJECTED}</Tag>;
                break;
        case Enum.ProducedItemStatus.APPROVED:
            tag = <Tag color="success">{Enum.ProducedItemStatus.APPROVED}</Tag>;
            break;
        default:
            tag = <Tag color="default">NO STATUS</Tag>;
    }
    
    return tag;
}

export {ProducedItemStatusTag}