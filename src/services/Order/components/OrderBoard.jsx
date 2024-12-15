import { Table } from "antd";
import { Link } from "react-router-dom";
import OrderAction from "./OrderAction";


function OrderBoard({orders, loading}) {
    const columns = [
		{ key: "name", title: "Order Name", dataIndex: "name", width: "20%",
            render: (text, record) => <Link to={`${record.id}`}>{text}</Link>,
        },
		{ key: "inventoryAction", title: "Type", dataIndex: "inventoryAction", width: "15%",
            render: (_, {inventoryAction}) => (<div>{inventoryAction.name}</div>)
        },
        { key: "status", title: "Status", dataIndex: "status", width: "15%" },
		{ key: "orderDate", title: "Order Date", dataIndex: "orderDate", width: "20%" },
		{ key: "expectedDeliveryDate", title: "Expected Delivery Date", dataIndex: "expectedDeliveryDate", width: "20%" },
		{
		    key: "actions",
		    title: "Action",
		    render: (_, record) => <OrderAction order={record} />,
		},
	];

    return (
        <>
            <Table loading={loading} dataSource={orders} columns={columns} rowKey="id"></Table>
        </>
    );
}

export default OrderBoard;