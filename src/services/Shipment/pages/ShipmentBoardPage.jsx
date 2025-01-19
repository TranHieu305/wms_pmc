import { useEffect, useState } from "react";
import { notificationHelper } from "../../../shared/utils/notificationHelper";
import SharedIcon from "../../../shared/components/common/Icon";
import shipmentApi from "../api/shipmentApi";
import BoardPage from "../../../shared/components/BoardPage";
import { ShipmentCreateBtn } from "../components/ShipmentButton";
import ShipmentBoard from "../components/ShipmentBoard";
import shipmentActionPermission from "../utils/actionPermission";
import { useLayoutContext } from "../../../shared/components/AppLayout";
import Enum from "../../../shared/utils/enum";
function ShipmentBoardPage() {
    const [shipments, setShipments] = useState([]);
    const [loading, setLoading] = useState(true);
    const {setSelectedMenuKey, setBreadcrumbItems} = useLayoutContext();

    useEffect(() => {
        setSelectedMenuKey(Enum.Menu.shipment.key);
        setBreadcrumbItems([
            {
                title: Enum.Menu.shipment.label,
            },
        ]);
    }, [setSelectedMenuKey, setBreadcrumbItems]);

    
    // Get all partners
    useEffect(() => {
        const fetchShipments = async () => {
          try {
            const response = await shipmentApi.getAllShipments();
            setShipments(response.data.data); 
          } catch (err) {
            notificationHelper.showErrorNotification({description : err.response.data.message})
          } finally {
            setLoading(false);
          }
        };
    
        fetchShipments();
    }, []);

    return (
    <BoardPage.ContentContainer>
        {/* Subheader */}
        <BoardPage.Subheader 
            icon={(<SharedIcon.Shipment width={24} height={24} fill="rgba(0, 167, 111, 1)"></SharedIcon.Shipment>)}
            title = "All Shipment"
        >
            {shipmentActionPermission.canAdd() && <ShipmentCreateBtn />}
        </BoardPage.Subheader >
     
        {/* Table */}
        <BoardPage.BoardContainer>
            <ShipmentBoard shipments={shipments} loading={loading}></ShipmentBoard>
        </BoardPage.BoardContainer>
    </BoardPage.ContentContainer>)
}

export default ShipmentBoardPage;