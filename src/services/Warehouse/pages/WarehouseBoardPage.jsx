import { useEffect, useState } from "react";
import warehouseApi from "../api/warehouseApi";
import { notificationHelper } from "../../../shared/utils/notificationHelper";
import SharedIcon from "../../../shared/components/common/Icon";
import WarehouseBoard from "../components/WarehouseBoard";
import BtnSaveWarehouse from "../components/BtnSaveWarehouse";
import BoardPage from "../../../shared/components/BoardPage";

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
    <>
        {/* Subheader */}
        <BoardPage.Subheader 
            icon={(<SharedIcon.Warehouse width={24} height={24} fill="rgba(0, 167, 111, 1)"></SharedIcon.Warehouse>)}
            title = "Warehouse"
        >
            <BtnSaveWarehouse />
        </BoardPage.Subheader >
     
        {/* Table */}
        <WarehouseBoard warehouses={warehouses} loading={loading}></WarehouseBoard>
    </>)
}

export default WarehouseBoardPage;