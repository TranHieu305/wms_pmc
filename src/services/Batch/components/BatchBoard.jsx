import { Table } from "antd";
import { Link } from "react-router-dom";
import BatchAction from "./BatchAction";
import dataHelper from "../../../shared/utils/dataHelper";
import { SharedAvatar, SharedTag } from "../../../shared/components/common";
import { BatchStatusTag } from "./BatchTag";

function BatchBoard({batches, loading}) {
    const columns = [
		{ key: "name", title: "Batch Name", dataIndex: "name", width: "15%",
            render: (text, record) => (
                <Link to={`/batches/${record.id}`}> 
                    {record.name}
                </Link>
            ),                
        },
        { key: "order", title: "Order", dataIndex: ["order","name"], width: "15%",
            render: (text, record) => (
                <Link to={`/orders/${record.order?.id}`}> 
                    {record.order?.name || "---"}
                </Link>
            ),                },
        { key: "partner", title: "Partner", dataIndex: ["partner","name"], width: "15%",
            render: (text, record) => (
                <Link to={`/partners/${record.partner?.id}`}> 
                    {record.partner?.name}
                </Link>
            ),                },
        { key: "warehouse", title: "Warehouse", dataIndex: ["warehouse","name"], width: "15%",
            render: (text, record) => (
                <Link to={`/warehouses/${record.warehouse?.id}`}> 
                    {record.warehouse?.name}
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
        { key: "creator", title: "Creator", dataIndex: "createdBy", width: "10%",
            render: (_, {createdBy}) => (<div>{<SharedAvatar.SingleUser userId={createdBy} />}</div>)
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