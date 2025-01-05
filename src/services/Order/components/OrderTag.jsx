import { Tag } from "antd";
import Enum from "../../../shared/utils/enum";

function OrderStatusTag({status}) {
    let tag;
    switch (status) {
        case Enum.OrderStatus.PENDING_APPROVAL:
            tag = <Tag color="default">{Enum.OrderStatus.PENDING_APPROVAL}</Tag>;
            break;
        case Enum.OrderStatus.REJECTED:
                tag = <Tag color="error">{Enum.OrderStatus.REJECTED}</Tag>;
                break;
        case Enum.OrderStatus.PENDING:
                tag = <Tag color="processing">{Enum.OrderStatus.PENDING}</Tag>;
                break;  
        case Enum.OrderStatus.COMPLETED:
            tag = <Tag color="success">{Enum.OrderStatus.COMPLETED}</Tag>;
            break;
        default:
            tag = <Tag color="default">NO STATUS</Tag>;
    }
    
    return tag;
}

export {OrderStatusTag}