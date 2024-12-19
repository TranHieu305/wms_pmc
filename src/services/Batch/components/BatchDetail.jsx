import { Divider, Table } from "antd";
import DetailPage from "../../../shared/components/DetailPage";
import dataHelper from "../../../shared/utils/dataHelper";
import { Link } from "react-router-dom";
import BatchItemAction from "./BatchItemAction";

function BatchItemBoard({batch}) {
    const batchItems = batch.batchItems || [];

    const columns = [
        { key: "name", title: "Product", dataIndex: ["product","name"], width: "20%",
            render: (text, record) => <Link to={`/products/${record.product?.id}`}>{record.product?.name}</Link>,
        },
        { key: "uom", title: "Unit", dataIndex: "uom", width: "15%" },
		{ key: "quantity", title: "Quantity", dataIndex: "quantity", width: "20%" },
        { key: "weight", title: "Weight", dataIndex: "weight", width: "20%" },
        {
		    key: "actions",
		    title: "Action",
		    render: (_, record) => <BatchItemAction batch={batch} item={record} />,
		},
    ];

    return (
        <DetailPage.DetailContainer>
            <DetailPage.InforCardTitle>
                <div className="flex items-center justify-between p-4"> 
                    <div>Batch item</div>
                    {/* <OrderBtnAddItem order={order}/> */}
                </div>
            </DetailPage.InforCardTitle>
            <Table dataSource={batchItems} columns={columns} rowKey="id"></Table>
        </DetailPage.DetailContainer>
    );

}

function Infor({batch}) {
    return (
        <DetailPage.DetailContainer>
            <DetailPage.InforCard>
                <DetailPage.InforCardTitle>Information</DetailPage.InforCardTitle>
                <Divider />

                {/* Info Items */}
                <div className="space-y-4">
                    <DetailPage.InforItem label="Name" value={batch.name}></DetailPage.InforItem>
                    <DetailPage.InforItem label="Type" value={batch.inventoryAction}></DetailPage.InforItem>
                    <DetailPage.InforItem label="Date" value={dataHelper.formatDate(batch.batchDate)}></DetailPage.InforItem>
                    <DetailPage.InforItem label="Order">
                        <Link to={`/orders/${batch.order?.id}`}>{batch.order?.name}</Link>
                    </DetailPage.InforItem>
                    <DetailPage.InforItem label="Partner">
                        <Link to={`/partners/${batch.partner?.id}`}>{batch.partner?.name}</Link>
                    </DetailPage.InforItem>
                    <DetailPage.InforItem label="Warehouse">
                        <Link to={`/warehouses/${batch.warehouse?.id}`}>{batch.warehouse?.name}</Link>
                    </DetailPage.InforItem>

                </div>
            </DetailPage.InforCard>
        </DetailPage.DetailContainer>
    )
}

const BatchDetail = {
    BatchItemBoard,
    Infor
}

export default BatchDetail;