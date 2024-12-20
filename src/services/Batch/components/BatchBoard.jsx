import { Button, Table } from "antd";
import { Link } from "react-router-dom";
import BatchAction from "./BatchAction";
import dataHelper from "../../../shared/utils/dataHelper";
import SharedIcon from "../../../shared/components/common/Icon";
import { SharedTag } from "../../../shared/components/common";
import { BatchStatusTag } from "./BatchTag";

function BatchBoard({batches, loading}) {
    const columns = [
		{ key: "name", title: "Batch Name", dataIndex: "name", width: "15%",
            render: (text, record) => (
                <Link to={`/batches/${record.id}`}> 
                    <Button type="link" icon={<SharedIcon.Shipment width={18} height={18} fill="rgba(0, 167, 111, 1)"/>}>
                        {record.name}
                    </Button>
                </Link>
            ),                
        },
        { key: "order", title: "Order", dataIndex: ["order","name"], width: "15%",
            render: (text, record) => (
                <Link to={`/orders/${record.order?.id}`}> 
                    <Button type="link" icon={<SharedIcon.Order width={18} height={18} fill="rgba(0, 167, 111, 1)"/>}>
                        {record.order?.name || "---"}
                    </Button>
                </Link>
            ),                },
        { key: "partner", title: "Partner", dataIndex: ["partner","name"], width: "15%",
            render: (text, record) => (
                <Link to={`/partners/${record.partner?.id}`}> 
                    <Button type="link" icon={<SharedIcon.Partner width={18} height={18} fill="rgba(0, 167, 111, 1)"/>}>
                        {record.partner?.name}
                    </Button>
                </Link>
            ),                },
        { key: "warehouse", title: "Warehouse", dataIndex: ["warehouse","name"], width: "15%",
            render: (text, record) => (
                <Link to={`/warehouses/${record.warehouse?.id}`}> 
                    <Button type="link" icon={<SharedIcon.Warehouse width={18} height={18} fill="rgba(0, 167, 111, 1)"/>}>
                        {record.warehouse?.name}
                    </Button>
                </Link>
            ),                },
		{ key: "inventoryAction", title: "Type", dataIndex: "inventoryAction", width: "10%",
            render: (_, {inventoryAction}) => (<SharedTag.InventoryAction action={inventoryAction}/>)
        },
        { key: "status", title: "Status", dataIndex: "status", width: "10%",
            render: (_, {status}) => (<BatchStatusTag status={status}/>)
         },
		{ key: "batchDate", title: "Date", dataIndex: "batchDate", width: "10%",
            render: (_,{batchDate}) => (<div>{dataHelper.formatDate(batchDate)}</div>)
        },
		{
		    key: "actions",
		    title: "Action",
		    render: (_, record) => <BatchAction batch={record} />,
		},
	];

    return (
        <>
            <Table loading={loading} dataSource={batches} columns={columns} rowKey="id"></Table>
        </>
    );
}

export default BatchBoard;