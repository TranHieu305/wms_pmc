import { Table } from "antd";
import { Link } from "react-router-dom";

function BatchBoard({batches, loading}) {
    const columns = [
		{ key: "name", title: "Batch Name", dataIndex: "name", width: "20%",
            render: (text, record) => <Link to={`${record.id}`}>{text}</Link>,
        },
        { key: "order", title: "Order", dataIndex: "order", width: "20%",
            render: (text, record) => <Link to={`/orders/${record.order?.id}`}>{text}</Link>,
        },
        { key: "partner", title: "Partner", dataIndex: "partner", width: "20%",
            render: (text, record) => <Link to={`/partners/${record.partner?.id}`}>{text}</Link>,
        },
        { key: "warehouse", title: "Warehouse", dataIndex: "warehouse", width: "20%",
            render: (text, record) => <Link to={`/warehouses/${record.warehouse?.id}`}>{text}</Link>,
        },
		{ key: "inventoryAction", title: "Type", dataIndex: "inventoryAction", width: "15%",
            render: (_, {inventoryAction}) => (<div>{inventoryAction.name}</div>)
        },
        { key: "status", title: "Status", dataIndex: "status", width: "15%" },
		{ key: "batchDate", title: "Date", dataIndex: "batchDate", width: "20%" },
		{
		    key: "actions",
		    title: "Action",
		    // render: (_, record) => <BatchAction batch={record} />,
		},
	];

    return (
        <>
            <Table loading={loading} dataSource={batches} columns={columns} rowKey="id"></Table>
        </>
    );
}

export default BatchBoard;