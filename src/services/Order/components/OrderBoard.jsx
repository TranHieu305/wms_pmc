import { Table } from "antd";
import { Link } from "react-router-dom";
import OrderAction from "./OrderAction";
import dataHelper from "../../../shared/utils/dataHelper";
import { SharedTag } from "../../../shared/components/common";


function OrderBoard({orders, loading}) {
    const columns = [
		{ key: "name", title: "Order Name", dataIndex: "name", width: "20%",
            render: (text, record) => <Link to={`${record.id}`}>{text}</Link>,
        },
		{ key: "inventoryAction", title: "Type", dataIndex: "inventoryAction", width: "15%",
            render: (_, {inventoryAction}) => (<div>{<SharedTag.InventoryAction action={inventoryAction}/>}</div>)
        },
        { key: "status", title: "Status", dataIndex: "status", width: "15%" },
		{ key: "orderDate", title: "Order Date", dataIndex: "orderDate", width: "20%",
            render: (_, {orderDate}) => (<div>{dataHelper.formatDate(orderDate)}</div>)
        },
		{ key: "expectedDeliveryDate", title: "Expected Delivery Date", dataIndex: "expectedDeliveryDate", width: "20%",
            render: (_, {expectedDeliveryDate}) => (<div>{dataHelper.formatDate(expectedDeliveryDate)}</div>)
        },
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