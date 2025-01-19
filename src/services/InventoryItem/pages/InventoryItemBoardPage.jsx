import { useEffect, useState } from "react";
import { notificationHelper } from "../../../shared/utils/notificationHelper";
import SharedIcon from "../../../shared/components/common/Icon";
import inventoryItemApi from "../api/inventoryItemApi";
import BoardPage from "../../../shared/components/BoardPage";
import InventoryItemBoard from "../components/InventoryItemBoard";
import inventoryItemActionPermission from "../utils/actionPermission";
import NoPermissionPage from "../../../shared/components/NoPermissionPage";
import { useLayoutContext } from "../../../shared/components/AppLayout";
import Enum from "../../../shared/utils/enum";

function InventoryItemBoardPage() {
    if (!inventoryItemActionPermission.canViewBoard()) {
        return <NoPermissionPage />
    }
    
    return <InventoryItemBoardContent />
}

function InventoryItemBoardContent() {
   
    const [inventoryItems, setInventoryItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const {setSelectedMenuKey, setBreadcrumbItems} = useLayoutContext();

    useEffect(() => {
        setSelectedMenuKey(Enum.Menu.inventoryItem.key);
        setBreadcrumbItems([
            {
                title: Enum.Menu.inventoryItem.label,
            },
        ]);
    }, [setSelectedMenuKey, setBreadcrumbItems]);
    
    // Get all partners
    useEffect(() => {
        const fetchInventoryItems = async () => {
          try {
            const response = await inventoryItemApi.getAll();
            setInventoryItems(response.data.data); 
          } catch (err) {
            notificationHelper.showErrorNotification({description : err.response.data.message})
          } finally {
            setLoading(false);
          }
        };
    
        fetchInventoryItems();
    }, []);

    return (
    <BoardPage.ContentContainer>
        {/* Subheader */}
        <BoardPage.Subheader 
            icon={(<SharedIcon.InventoryItem width={24} height={24} fill="rgba(0, 167, 111, 1)"></SharedIcon.InventoryItem>)}
            title = "All Inventory Item"
        >
        </BoardPage.Subheader >
     
        {/* Table */}
        <BoardPage.BoardContainer>
            <InventoryItemBoard inventoryItems={inventoryItems} loading={loading}></InventoryItemBoard>
        </BoardPage.BoardContainer>
    </BoardPage.ContentContainer>)
}

export default InventoryItemBoardPage;