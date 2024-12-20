import { Tag } from "antd";
import Enum from "../../../shared/utils/enum";

function OrderStatusTag({status}) {
    let tag;
    switch (status) {
        case Enum.OrderStatus.PENDING:
            tag = <Tag color="default">PENDING</Tag>;
            break;
        case Enum.OrderStatus.COMPLETED:
            tag = <Tag color="success">COMPLETED</Tag>;
            break;
        default:
            tag = <Tag color="default">PENDING</Tag>;
    }
    
    return tag;
}

export {OrderStatusTag}