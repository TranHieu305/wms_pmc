import { Divider, Table } from "antd";
import DetailPage from "../../../shared/components/DetailPage";
import dataHelper from "../../../shared/utils/dataHelper";
import { Link } from "react-router-dom";
import OrderItemAction from "./OrderItemAction";
import { OrderBtnAddItem } from "./OrderButton";
import { Avatar, SharedTag } from "../../../shared/components/common";
import Enum from "../../../shared/utils/enum";

function OrderItemBoard({order}) {
    const editable = order.status !== Enum.OrderStatus.COMPLETED;
    const orderItems = order.orderItems || [];

    const columns = [
		{ key: "name", title: "Product name", dataIndex: ["product","name"], width: "25%",
            render: (text, record) => <Link to={`/products/${record.product?.id}`}>{record.product?.name}</Link>,
        },
        { key: "name", title: "Category", dataIndex: ["product","category"], width: "15%",
            render: (text, record) => <div>{record.product?.productCategory?.name || "---"}</div>,
        },
        { key: "uom", title: "Unit", dataIndex: "uom", width: "10%" },
		{ key: "quantity", title: "Quantity", dataIndex: "quantity", width: "20%" },
        { key: "deliveredQuantity", title: "Delivered quantity", dataIndex: "deliveredQuantity", width: "20%" },
       

	];
    if (editable) {
        columns.push(
            {
                key: "actions",
                title: "Action",
                render: (_, record) => <OrderItemAction item={record} />,
            },
        );
    }

    return (
        <DetailPage.DetailContainer>
            <DetailPage.InfoCardTitle>
                <div className="flex items-center justify-between p-4"> 
                    <div>Order item</div>
                    {editable && <OrderBtnAddItem order={order}/>}
                </div>
            </DetailPage.InfoCardTitle>
            <Table dataSource={orderItems} columns={columns} rowKey="id"></Table>
        </DetailPage.DetailContainer>
    );
}

function Info({order}) {
    return (
        <DetailPage.DetailContainer>
            <DetailPage.InfoCard>
                <DetailPage.InfoCardTitle>Information</DetailPage.InfoCardTitle>
                <Divider />

                {/* Info Items */}
                <div className="space-y-4">
                    <DetailPage.InfoItem label="Name" value={order.name}></DetailPage.InfoItem>
                    <DetailPage.InfoItem label="Partner" value={(
                        <Link to={`/partners/${order.partner?.id}`}> 
                            {order.partner?.name}
                        </Link>
                    )}>
                    </DetailPage.InfoItem>
                    <DetailPage.InfoItem label="Type" value={<SharedTag.InventoryAction action={order.inventoryAction}/>}></DetailPage.InfoItem>
                    <DetailPage.InfoItem label="Order date" value={dataHelper.formatDate(order.orderDate)}></DetailPage.InfoItem>
                    <DetailPage.InfoItem label="Expected delivery date" value={dataHelper.formatDate(order.expectedDeliveryDate)}></DetailPage.InfoItem>
                    <DetailPage.InfoItem label="Responsible person" >
                        <Avatar.SingleUser name="hieu.tran"/>
                    </DetailPage.InfoItem>
                    <DetailPage.InfoItem label="Approver" >
                        <Avatar.SingleUser name="admin"/>
                    </DetailPage.InfoItem>
                    <DetailPage.InfoItem label="Participants" >
                        <Avatar.MultiUser name="hieu.tran"/>
                    </DetailPage.InfoItem>
                </div>
            </DetailPage.InfoCard>
        </DetailPage.DetailContainer>
    )
}

const OrderDetail = {
    OrderItemBoard,
    Info
}

export default OrderDetail;