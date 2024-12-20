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


function BatchDetailPage() {
    const {batchId} = useParams();
    const [batch, setBatch] = useState();
    const navigate = useNavigate();

     // Get orders
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
                            <BatchAction batch={batch} className="bg-white"/>
                        </DetailPage.Subheader>
                         {/* Content */}
                         <Row gutter={24}>
                            <Col span={18}>
                                <BatchDetail.BatchItemBoard batch={batch} />
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