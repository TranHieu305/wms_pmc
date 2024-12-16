import { Divider, Table } from "antd";
import DetailPage from "../../../shared/components/DetailPage";
import dataHelper from "../../../shared/utils/dataHelper";
import { Link } from "react-router-dom";

function OrderItemBoard({order}) {
    const orderItems = order.orderItems || [];

    const columns = [
		{ key: "name", title: "Product name", dataIndex: ["product","name"], width: "20%",
            render: (text, record) => <Link to={`/products/${record.product?.id}`}>{record.product?.name}</Link>,
        },
        { key: "uom", title: "Unit", dataIndex: "uom", width: "15%" },
		{ key: "quantity", title: "Quantity", dataIndex: "quantity", width: "20%" },
        { key: "packedQuantity", title: "Packed quantity", dataIndex: "packedQuantity", width: "20%" },

	];

    return (
        <DetailPage.DetailContainer>
            <DetailPage.InforCardTitle>Order item</DetailPage.InforCardTitle>
            <Table dataSource={orderItems} columns={columns} rowKey="id"></Table>
        </DetailPage.DetailContainer>
    );
}

function Infor({order}) {
    return (
        <DetailPage.DetailContainer>
            <DetailPage.InforCard>
                <DetailPage.InforCardTitle>Information</DetailPage.InforCardTitle>
                <Divider />

                {/* Info Items */}
                <div className="space-y-4">
                    <DetailPage.InforItem label="Name" value={order.name}></DetailPage.InforItem>
                    <DetailPage.InforItem label="Type" value={order.inventoryAction}></DetailPage.InforItem>
                    <DetailPage.InforItem label="Order date" value={dataHelper.formatDate(order.orderDate)}></DetailPage.InforItem>
                    <DetailPage.InforItem label="Expected delivery date" value={dataHelper.formatDate(order.expectedDeliveryDate)}></DetailPage.InforItem>
                </div>
            </DetailPage.InforCard>
        </DetailPage.DetailContainer>
    )
}

const OrderDetail = {
    OrderItemBoard,
    Infor
}

export default OrderDetail;