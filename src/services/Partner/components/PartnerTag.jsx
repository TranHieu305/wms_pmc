import { Tag } from "antd";
import Enum from "../../../shared/utils/enum";

function PartnerTypeTag ({type}) {
    if (!type) {
        return;
    }
    if (type === Enum.PartnerType.SUPPLIER) {
        return <Tag color="gold">{Enum.PartnerType.SUPPLIER}</Tag>
    }
    return <Tag color="blue">{Enum.PartnerType.CUSTOMER}</Tag>
}


export {PartnerTypeTag}