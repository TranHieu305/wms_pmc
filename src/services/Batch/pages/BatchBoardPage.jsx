import { useEffect, useState } from "react";
import { notificationHelper } from "../../../shared/utils/notificationHelper";
import SharedIcon from "../../../shared/components/common/Icon";
import batchApi from "../api/batchApi";
import BoardPage from "../../../shared/components/BoardPage";
import BatchBoard from "../components/BatchBoard";
import { useLayoutContext } from "../../../shared/components/AppLayout";
import Enum from "../../../shared/utils/enum";

function BatchBoardPage() {
    const [batchs, setBatchs] = useState([]);
    const [loading, setLoading] = useState(true);
    const {setSelectedMenuKey, setBreadcrumbItems} = useLayoutContext();

    useEffect(() => {
        setSelectedMenuKey(Enum.Menu.batch.key);
        setBreadcrumbItems([
            {
                title: Enum.Menu.batch.label,
            },
        ]);
    }, [setSelectedMenuKey, setBreadcrumbItems]);

    
    // Get all partners
    useEffect(() => {
        const fetchBatchs = async () => {
          try {
            const response = await batchApi.getAllBatches();
            setBatchs(response.data.data); 
          } catch (err) {
            notificationHelper.showErrorNotification({description : err.response.data.message})
          } finally {
            setLoading(false);
          }
        };
    
        fetchBatchs();
    }, []);

    return (
        <BoardPage.ContentContainer>
            {/* Subheader */}
            <BoardPage.Subheader 
                icon={(<SharedIcon.Shipment width={24} height={24} fill="rgba(0, 167, 111, 1)"></SharedIcon.Shipment>)}
                title = "All Batch"
            >
                {/* <BatchBtnSave /> */}
            </BoardPage.Subheader >
         
            {/* Table */}
            <BoardPage.BoardContainer>
                <BatchBoard batches={batchs} loading={loading}></BatchBoard>
            </BoardPage.BoardContainer>
        </BoardPage.ContentContainer>)
}

export default BatchBoardPage;