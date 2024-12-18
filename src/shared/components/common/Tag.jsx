import { Tag } from "antd";
import Enum from "../../utils/enum";

const InventoryAction = ({action}) => {
    if (action === Enum.InventoryAction.IMPORT) {
        return <Tag color="green">{Enum.InventoryAction.IMPORT}</Tag>
    }
    return <Tag color="blue">{Enum.InventoryAction.EXPORT}</Tag>
}

const SharedTag = {
    InventoryAction
}

export default SharedTag;