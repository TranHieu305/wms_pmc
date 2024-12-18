import { Button, Table } from "antd";
import { Link } from "react-router-dom";
import SharedIcon from "../../../shared/components/common/Icon";

function InventoryItemBoard({inventoryItems, loading}) {
    const columns = [
        { key: "code", title: "Product Code", dataIndex: ["product","code"], width: "10%" },
		{ key: "name", title: "Product Name", dataIndex: ["product","name"], width: "20%",
            render: (text, record) => (
                <Link to={`/products/${record.product.id}`}> 
                    <Button type="link" icon={<SharedIcon.Product width={18} height={18} fill="rgba(0, 167, 111, 1)"/>}>
                        {record.product.name}
                    </Button>
                </Link>
            ),
        },
		{ key: "batch", title: "Batch", dataIndex: "batchName", width: "10%",
            render: (text, record) => (
                <Link to={`/batches/${record.batchId}`}> 
                    <Button type="link" icon={<SharedIcon.Shipment width={18} height={18} fill="rgba(0, 167, 111, 1)"/>}>
                        {record.batchName}
                    </Button>
                </Link>
            ),        
        },
		{ key: "quantity", title: "Quantity", dataIndex: "quantity", width: "10%" },
        { key: "unit", title: "Unit", dataIndex: ["product","uom"], width: "10%" },
        { key: "warehouse", title: "Warehouse", dataIndex: "warehouseName", width: "10%",
            render: (text, record) => (
                <Link to={`/products/${record.warehouseId}`}> 
                    <Button type="link" icon={<SharedIcon.Warehouse width={18} height={18} fill="rgba(0, 167, 111, 1)"/>}>
                        {record.warehouseName}
                    </Button>
                </Link>
            ),        
        },
		{ key: "createAt", title: "Datetime", dataIndex: "createAt", width: "30%" },
	];

    return (
        <>
            <Table loading={loading} dataSource={inventoryItems} columns={columns} rowKey="id"></Table>
        </>
    );
}

export default InventoryItemBoard;