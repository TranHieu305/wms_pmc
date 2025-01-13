import { useEffect, useState } from "react";
import vehicleApi from "../api/vehicleApi";
import { notificationHelper } from "../../../shared/utils/notificationHelper";
import SharedIcon from "../../../shared/components/common/Icon";
import BoardPage from "../../../shared/components/BoardPage";
import VehicleBoard from "../components/VehicleBoard";
import vehicleActionPermission from "../utils/actionPermission";
import { VehicleBtnAdd } from "../components/VehicleButton";

function VehicleBoardPage() {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Get all partners
    useEffect(() => {
        const fetchVehicles = async () => {
          try {
            const response = await vehicleApi.getAllVehicles();
            setVehicles(response.data.data); 
          } catch (err) {
            notificationHelper.showErrorNotification({description : err.response.data.message})
          } finally {
            setLoading(false);
          }
        };
    
        fetchVehicles();
    }, []);

    return (
    <BoardPage.ContentContainer>
        {/* Subheader */}
        <BoardPage.Subheader 
            icon={(<SharedIcon.Setting width={24} height={24} fill="rgba(0, 167, 111, 1)"></SharedIcon.Setting>)}
            title = "Vehicle"
        >
            {vehicleActionPermission.canAction() && <VehicleBtnAdd />}
        </BoardPage.Subheader >
     
        {/* Table */}
        <BoardPage.BoardContainer>
            <VehicleBoard vehicles={vehicles} loading={loading}></VehicleBoard>
        </BoardPage.BoardContainer>
    </BoardPage.ContentContainer>)
}

export default VehicleBoardPage;