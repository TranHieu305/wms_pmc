import { Divider } from "antd";
import DetailPage from "../../../shared/components/DetailPage";
import dataHelper from "../../../shared/utils/dataHelper";
import { SharedAvatar } from "../../../shared/components/common";
import ShipmentBatchBoard from "./ShipmentBatchBoard";

function  ShipmentBatch({shipment}) {
    return (
        <DetailPage.DetailContainer>
            <DetailPage.InfoCardTitle>
                <div className="flex items-center justify-between p-4"> 
                    <div>Shipment batch</div>
                </div>
            </DetailPage.InfoCardTitle>
            <ShipmentBatchBoard shipment={shipment}/>
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
    ShipmentBatch,
    Info
}

export default ShipmentDetail;