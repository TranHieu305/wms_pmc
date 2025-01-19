import { Divider } from "antd";
import DetailPage from "../../../shared/components/DetailPage";
import { PartnerTypeTag } from "./PartnerTag";
import PartnerAddressBoard from "./PartnerAddressBoard";
import partnerActionPermission from "../utils/actionPermission";
import { PartnerAddressBtnCreate } from "./PartnerAddressButton";

function Info({partner}) {
    return (
        <DetailPage.DetailContainer>
            <DetailPage.InfoCard>
                <DetailPage.InfoCardTitle>Information</DetailPage.InfoCardTitle>
                <Divider />

                {/* Info Items */}
                <div className="space-y-4">
                    <DetailPage.InfoItem label="Name" value={partner.name}></DetailPage.InfoItem>
                    <DetailPage.InfoItem label="Type">
                        <PartnerTypeTag type={partner.type}/>
                    </DetailPage.InfoItem>
                    <DetailPage.InfoItem label="Email" value={partner.email}></DetailPage.InfoItem>
                    <DetailPage.InfoItem label="Phone number" value={partner.phoneNumber}></DetailPage.InfoItem>
                    <DetailPage.InfoItem label="Description" value={partner.description}></DetailPage.InfoItem>
                </div>
            </DetailPage.InfoCard>
        </DetailPage.DetailContainer>
    )
}

function Addresses({partner}) {
    return (
        <DetailPage.DetailContainer>
            <DetailPage.InfoCard>
            <div className="flex items-center justify-between">
                <DetailPage.InfoCardTitle>Partner address</DetailPage.InfoCardTitle>
                {
                    partnerActionPermission.canAction()
                    && <PartnerAddressBtnCreate partner={partner} />
                }
            </div>
                <Divider />
                <PartnerAddressBoard partner={partner}/>
            </DetailPage.InfoCard>
        </DetailPage.DetailContainer>
    )
}

const PartnerDetail = {
    Info,
    Addresses
}

export default PartnerDetail;