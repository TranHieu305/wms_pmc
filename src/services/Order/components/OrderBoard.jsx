import { Button, Table } from "antd";
import { Link } from "react-router-dom";
import OrderAction from "./OrderAction";
import dataHelper from "../../../shared/utils/dataHelper";
import { SharedTag } from "../../../shared/components/common";
import { OrderStatusTag } from "./OrderTag";
import SharedIcon from "../../../shared/components/common/Icon";


function OrderBoard({orders, loading}) {
    const columns = [
		{ key: "name", title: "Order Name", dataIndex: "name", width: "20%",
            render: (text, record) => (
                <Link to={`/orders/${record.id}`}> 
                    <Button type="link" icon={<SharedIcon.Order width={18} height={18} fill="rgba(0, 167, 111, 1)"/>}>
                        {record.name}
                    </Button>
                </Link>
            ),
        },
        { key: "partner", title: "Partner", dataIndex: ["partner", "name"], width: "20%",
            render: (text, record) => (
                <Link to={`/partners/${record.partner?.id}`}> 
                    <Button type="link" icon={<SharedIcon.Partner width={18} height={18} fill="rgba(0, 167, 111, 1)"/>}>
                        {record.partner?.name}
                    </Button>
                </Link>
            ),
        },

		{ key: "inventoryAction", title: "Type", dataIndex: "inventoryAction", width: "10%",
            render: (_, {inventoryAction}) => (<div>{<SharedTag.InventoryAction action={inventoryAction}/>}</div>)
        },
        { key: "status", title: "Status", dataIndex: "status", width: "10%",
            render: (_, {status}) => (<OrderStatusTag status={status}/>)
         },
		{ key: "orderDate", title: "Order Date", dataIndex: "orderDate", width: "15%",
            render: (_, {orderDate}) => (<div>{dataHelper.formatDate(orderDate)}</div>)
        },
		{ key: "expectedDeliveryDate", title: "Expected Delivery Date", dataIndex: "expectedDeliveryDate", width: "15%",
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