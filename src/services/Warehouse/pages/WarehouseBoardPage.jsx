import { useEffect, useState } from "react";
import warehouseApi from "../api/warehouseApi";
import { notificationHelper } from "../../../shared/utils/notificationHelper";
import SharedIcon from "../../../shared/components/common/Icon";
import WarehouseBoard from "../components/WarehouseBoard";
import { WarehouseBtnSave } from "../components/WarehouseButton";
import BoardPage from "../../../shared/components/BoardPage";
import warehouseActionPermission from "../utils/actionPermission";

function WarehouseBoardPage() {
    const [warehouses, setWarehouses] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Get all partners
    useEffect(() => {
        const fetchWarehouses = async () => {
          try {
            const response = await warehouseApi.getAllWarehouses();
            setWarehouses(response.data.data); 
          } catch (err) {
            notificationHelper.showErrorNotification({description : err.response.data.message})
          } finally {
            setLoading(false);
          }
        };
    
        fetchWarehouses();
    }, []);

    return (
    <BoardPage.ContentContainer>
        {/* Subheader */}
        <BoardPage.Subheader 
            icon={(<SharedIcon.Warehouse width={24} height={24} fill="rgba(0, 167, 111, 1)"></SharedIcon.Warehouse>)}
            title = "Warehouse"
        >
            {warehouseActionPermission.canAction() && <WarehouseBtnSave />}
        </BoardPage.Subheader >
     
        {/* Table */}
        <BoardPage.BoardContainer>
            <WarehouseBoard warehouses={warehouses} loading={loading}></WarehouseBoard>
        </BoardPage.BoardContainer>
    </BoardPage.ContentContainer>)
}

export default WarehouseBoardPage;