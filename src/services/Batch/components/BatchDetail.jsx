import { Button, Divider, Table } from "antd";
import DetailPage from "../../../shared/components/DetailPage";
import dataHelper from "../../../shared/utils/dataHelper";
import { Link } from "react-router-dom";
import BatchItemAction from "./BatchItemAction";
import { SharedTag } from "../../../shared/components/common";
import SharedIcon from "../../../shared/components/common/Icon";
import { BatchItemStatusTag } from "./BatchTag";
import Enum from "../../../shared/utils/enum";

function BatchItemBoard({batch}) {
    console.log(batch.batchItems);
    const batchItems = batch.batchItems || [];

    const columns = [
        { key: "name", title: "Product", dataIndex: ["product","name"],
            render: (text, record) => (
                <Link to={`/products/${record.product?.id}`}> 
                <Button type="link" icon={<SharedIcon.Product width={18} height={18} fill="rgba(0, 167, 111, 1)"/>}>
                    {record.product?.name}
                </Button>
            </Link>
            ),
        },
		{ key: "quantity", title: "Quantity", dataIndex: "quantity", width: "20%" },
        { key: "uom", title: "Unit", dataIndex: "uom", width: "15%" },
        { key: "weight", title: "Weight(Kg)", dataIndex: "weight", width: "15%" },
    ];

    if (batch.inventoryAction === Enum.InventoryAction.EXPORT) {
        columns.push(
            { key: "status", title: "Status", dataIndex: "status", width: "20%",
                render: (_, {status}) => (<BatchItemStatusTag status={status}/>)
            }
        )
    }

    if (batch.status !== Enum.BatchStatus.COMPLETED) {
        columns.push(
            {
                key: "actions",
                title: "Action",
                render: (_, record) => <BatchItemAction batch={batch} item={record} />,
            },
        )
    }

    return (
        <DetailPage.DetailContainer>
            <DetailPage.InfoCardTitle>
                <div className="flex items-center justify-between p-4"> 
                    <div>Batch item</div>
                    {/* <OrderBtnAddItem order={order}/> */}
                </div>
            </DetailPage.InfoCardTitle>
            <Table dataSource={batchItems} columns={columns} rowKey="id"></Table>
        </DetailPage.DetailContainer>
    );

}

function Info({batch}) {
    return (
        <DetailPage.DetailContainer>
            <DetailPage.InfoCard>
                <DetailPage.InfoCardTitle>Information</DetailPage.InfoCardTitle>
                <Divider />

                {/* Info Items */}
                <div className="space-y-4">
                    <DetailPage.InfoItem label="Name" value={batch.name}></DetailPage.InfoItem>
                    <DetailPage.InfoItem label="Type" value={<SharedTag.InventoryAction action={batch.inventoryAction}/>}></DetailPage.InfoItem>
                    <DetailPage.InfoItem label="Date" value={dataHelper.formatDate(batch.batchDate)}></DetailPage.InfoItem>
                    <DetailPage.InfoItem label="Order">
                        <Link to={`/partners/${batch.order?.id}`}> 
                            {batch.order?.name || "---"}
                        </Link>
                    </DetailPage.InfoItem>
                    <DetailPage.InfoItem label="Partner">
                        <Link to={`/partners/${batch.partner?.id}`}> 
                            {batch.partner?.name || "---"}
                        </Link>                    
                    </DetailPage.InfoItem>
                    <DetailPage.InfoItem label="Warehouse">
                        <Link to={`/warehouses/${batch.warehouse?.id}`}> 
                            {batch.warehouse?.name || "---"}
                        </Link>    
                    </DetailPage.InfoItem>

                </div>
            </DetailPage.InfoCard>
        </DetailPage.DetailContainer>
    )
}

const BatchDetail = {
    BatchItemBoard,
    Info
}

export default BatchDetail;