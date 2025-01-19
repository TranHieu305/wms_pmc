import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import shipmentApi from "../api/shipmentApi";
import { notificationHelper } from "../../../shared/utils/notificationHelper";
import DetailPage from "../../../shared/components/DetailPage";
import { Col, Row } from "antd";
import LoadingPage from "../../../shared/components/LoadingPage";
import { ShipmentStatusTag } from "../components/ShipmentTag";
import ShipmentDetail from "../components/ShipmentDetail";
import shipmentActionPermission from "../utils/actionPermission";
import ShipmentAction from "../components/ShipmentAction";
import { useLayoutContext } from "../../../shared/components/AppLayout";
import Enum from "../../../shared/utils/enum";

function ShipmentDetailPage() {
    const {shipmentId} = useParams();
    const [shipment, setShipment] = useState();
    const navigate = useNavigate();
    const {setSelectedMenuKey, setBreadcrumbItems, setOpenMenuKey} = useLayoutContext();

    useEffect(() => {
        setOpenMenuKey([Enum.Menu.shipment.key]);
        setSelectedMenuKey(Enum.Menu.shipments.key);
        setBreadcrumbItems([
            {
                title: Enum.Menu.shipment.label,
            },
            {
                title: "Shipment detail",
            },
        ]);
    }, [setSelectedMenuKey, setBreadcrumbItems]);
    
    // Get shipments
    useEffect(() => {
        const fetchProducts = async () => {
          try {
            const response = await shipmentApi.getShipmentDetail(shipmentId);
            setShipment(response.data.data); 
          } catch (err) {
            navigate('/');
            notificationHelper.showErrorNotification({description : err.response.data.message})
          } 
        };
    
        fetchProducts();
    }, [shipmentId, navigate]);

    
    return (
        <DetailPage.Layout>
            {
                shipment ? ( 
                    <>
                        {/* Header */}
                        <DetailPage.Subheader 
                            title={
                                <div className="flex flex-row">
                                    {shipment.name}
                                    <div className="px-2">
                                        <ShipmentStatusTag status={shipment.status}/>
                                    </div>
                                </div>
                            }
                            id={shipment.id}
                            backLink="/shipments"
                        >
                            {!shipmentActionPermission.viewOnly() && <ShipmentAction shipment={shipment} className="bg-white"/>}      
                        </DetailPage.Subheader>
    
                        {/* Content */}
                        <Row gutter={24}>
                            <Col span={18}>
                                <ShipmentDetail.ShipmentBatchBoard shipment={shipment} />
                            </Col>
                            <Col span={6}>
                                <ShipmentDetail.Info shipment={shipment} />
                            </Col>
                        </Row>
                    </>
                ) 
                :  <LoadingPage />
            }
        </DetailPage.Layout>
        );
}

export default ShipmentDetailPage;