import { Tag } from "antd";

function WarehouseStatusTag({warehouse}) {
    if (!warehouse || !warehouse.active) {
        return;
    }
    if (warehouse.active) {
        return <Tag color="success">Active</Tag>
    }
    return <Tag color="error">Close</Tag>
}

export default WarehouseStatusTag;