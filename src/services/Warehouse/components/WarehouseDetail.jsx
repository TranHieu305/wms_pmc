import { Divider } from "antd";
import DetailPage from "../../../shared/components/DetailPage";

function Infor({warehouse}) {
    return (
        <DetailPage.DetailContainer>
            <DetailPage.InforCard>
                <h2 className="text-base font-semibold text-gray-800 mb-4">Information</h2>
                <Divider />

                {/* Info Items */}
                <div className="space-y-4">
                    <DetailPage.InforItem label="Name" value={warehouse.name}></DetailPage.InforItem>
                    <DetailPage.InforItem label="Address" value={warehouse.address}></DetailPage.InforItem>
                    <DetailPage.InforItem label="Description" value={warehouse.description}></DetailPage.InforItem>
                </div>
            </DetailPage.InforCard>
        </DetailPage.DetailContainer>
    )
}

const WarehouseDetail = {
    Infor
}

export default WarehouseDetail;