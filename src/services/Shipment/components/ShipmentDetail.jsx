import { Divider, Table } from "antd";
import DetailPage from "../../../shared/components/DetailPage";
import dataHelper from "../../../shared/utils/dataHelper";
import { Link } from "react-router-dom";
import { SharedAvatar, SharedTag } from "../../../shared/components/common";

function  ShipmentBatchBoard({shipment}) {
    const shipmentBatches = shipment.shipmentBatches || [];

    const columns = [
		{ key: "name", title: "Batch name", dataIndex: ["batch","name"], width: "20%",
            render: (text, record) => <Link to={`/batches/${record.batch?.id}`}>{record.batch?.name}</Link>,
        },
        { key: "address", title: "Address", dataIndex: ["partnerAddress","address"], width: "20%",
            render: (text, record) => <div>{record.partnerAddress?.address || "---"}</div>,
        },
        { key: "status", title: "Status", dataIndex: "status", width: "10%" },
		{ key: "order", title: "Shipment order", dataIndex: "shipmentOrder", width: "20%" },
	];
    // if (!shipmentActionPermission.itemViewOnly(shipment)) {
    //     columns.push(
    //         {
    //             key: "actions",
    //             title: "Action",
    //             render: (_, record) => <ShipmentItemAction item={record} />,
    //         },
    //     );
    // }

    return (
        <DetailPage.DetailContainer>
            <DetailPage.InfoCardTitle>
                <div className="flex items-center justify-between p-4"> 
                    <div>Shipment batch</div>
                </div>
            </DetailPage.InfoCardTitle>
            <Table dataSource={shipmentBatches} columns={columns} rowKey="id"></Table>
        </DetailPage.DetailContainer>
    );
}

function Info({shipment}) {

    return (
        <DetailPage.DetailContainer>
            <DetailPage.InfoCard>
                <DetailPage.InfoCardTitle>Information</DetailPage.InfoCardTitle>
                <Divider />

                {/* Info Items */}
                <div className="space-y-4">
                    <DetailPage.InfoItem label="Name" value={shipment.name}></DetailPage.InfoItem>
                    <DetailPage.InfoItem label="Shipment date" value={dataHelper.formatDate(shipment.date)}></DetailPage.InfoItem>
                    <DetailPage.InfoItem label="Creator" >
                        <SharedAvatar.SingleUser userId={shipment.createdBy}/>
                    </DetailPage.InfoItem>
                    <DetailPage.InfoItem label="Approvers" >
                        <SharedAvatar.MultiUser userIds={shipment.approverIds}/>
                    </DetailPage.InfoItem>
                    <DetailPage.InfoItem label="Participants" >
                        <SharedAvatar.MultiUser userIds={shipment.participantIds}/>
                    </DetailPage.InfoItem>
                </div>
            </DetailPage.InfoCard>
        </DetailPage.DetailContainer>
    )
}

const ShipmentDetail = {
    ShipmentBatchBoard,
    Info
}

export default ShipmentDetail;