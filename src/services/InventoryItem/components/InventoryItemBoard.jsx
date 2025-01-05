import { Table } from "antd";
import { Link } from "react-router-dom";
import SharedTag from "../../../shared/components/common/Tag";
import dataHelper from "../../../shared/utils/dataHelper";

function InventoryItemBoard({inventoryItems, loading}) {
    const columns = [
        { key: "code", title: "Product Code", dataIndex: ["product","code"], width: "15%" },
		{ key: "name", title: "Product Name", dataIndex: ["product","name"], width: "15%",
            render: (text, record) => (
                <Link to={`/products/${record.product.id}`}> 
                    {record.product.name}
                </Link>
            ),
        },
		{ key: "batch", title: "Batch", dataIndex: "batchName", width: "15%",
            render: (text, record) => (
                <Link to={`/batches/${record.batchId}`}> 
                    {record.batchName}
                </Link>
            ),        
        },
		{ key: "quantity", title: "Quantity", dataIndex: "quantity", width: "10%" },
        { key: "unit", title: "Unit", dataIndex: ["product","uom"], width: "10%" },
        { key: "warehouse", title: "Warehouse", dataIndex: "warehouseName", width: "15%",
            render: (text, record) => (
                <Link to={`/products/${record.warehouseId}`}> 
                    {record.warehouseName}
                </Link>
            ),        
        },
		{ key: "inventoryAction", title: "Type", dataIndex: "inventoryAction", width: "10%",
            render: (_, {inventoryAction}) => (<SharedTag.InventoryAction action={inventoryAction}></SharedTag.InventoryAction>)
        },
		{ key: "createAt", title: "Datetime", dataIndex: "createdAt", width: "10%",
            render: (_, {createdAt}) => <div>{dataHelper.formatDateTime(createdAt)}</div>
         },
	];

    return (
        <>
            <Table loading={loading} dataSource={inventoryItems} columns={columns} rowKey="id"></Table>
        </>
    );
}

export default InventoryItemBoard;