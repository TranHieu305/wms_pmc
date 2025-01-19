import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import batchApi from "../api/batchApi";
import { notificationHelper } from "../../../shared/utils/notificationHelper";
import DetailPage from "../../../shared/components/DetailPage";
import LoadingPage from "../../../shared/components/LoadingPage";
import BatchAction from "../components/BatchAction";
import { Col, Row } from "antd";
import BatchDetail from "../components/BatchDetail";
import { BatchStatusTag } from "../components/BatchTag";
import producedItemApi from "../../ProducedItem/api/producedItemApi";
import batchActionPermission from "../utils/actionPermission";
import { useLayoutContext } from "../../../shared/components/AppLayout";
import Enum from "../../../shared/utils/enum";

function BatchDetailPage() {
    const {batchId} = useParams();
    const [batch, setBatch] = useState();
    const navigate = useNavigate();
    const [producedItems, setProducedItems] = useState();

    const {setSelectedMenuKey, setBreadcrumbItems, setOpenMenuKey} = useLayoutContext();

    useEffect(() => {
        setOpenMenuKey([Enum.Menu.shipment.key]);
        setSelectedMenuKey(Enum.Menu.batch.key);
        setBreadcrumbItems([
            {
                title: Enum.Menu.batch.label,
            },
            {
                title: "Batch detail",
            },
        ]);
    }, [setSelectedMenuKey, setBreadcrumbItems, setOpenMenuKey]);

    // Get batch
    useEffect(() => {
        const fetchBatch = async () => {
          try {
            const response = await batchApi.getBatchDetail(batchId);
            setBatch(response.data.data); 
          } catch (err) {
            navigate('/');
            notificationHelper.showErrorNotification({description : err.response.data.message})
          } 
        };
    
        fetchBatch();
    }, [batchId, navigate]);

    // Get produced items of batch
    useEffect(() => {
        const fetchProducedItems = async () => {
            try {
                const response = await producedItemApi.getFromBatch(batchId);
                setProducedItems(response.data.data); 
            } catch (err) {
                notificationHelper.showErrorNotification({description : err.response.data.message})
            } 
        };
    
        fetchProducedItems();
    }, [batchId]);

    return (
        <DetailPage.Layout>
            {
                batch ? (
                    <>
                     {/* Header */}
                     <DetailPage.Subheader 
                             title={
                                <div className="flex flex-row">
                                    {batch.name}
                                    <div className="px-2">
                                        <BatchStatusTag status={batch.status}/>
                                    </div>
                                </div>
                            }
                            id={batch.id}
                            backLink="/batches"
                        >
                            {!batchActionPermission.viewOnly() && <BatchAction batch={batch} className="bg-white"/>}
                        </DetailPage.Subheader>
                         {/* Content */}
                         <Row gutter={24}>
                            <Col span={18}>
                                <BatchDetail.ItemTabs batch={batch} producedItems={producedItems}/>
                            </Col>
                            <Col span={6}>
                                <BatchDetail.Info batch={batch} />
                            </Col>
                        </Row>
                    </>
                )
                : <LoadingPage />
            }
        </DetailPage.Layout>
    )
}

export default BatchDetailPage;