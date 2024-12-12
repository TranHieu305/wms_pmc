import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { notificationHelper } from "../../../shared/utils/notificationHelper";
import warehouseApi from "../api/warehouseApi";
import DetailPage from "../../../shared/components/DetailPage";
import WarehouseAction from "../components/WarehouseAction";
import LoadingPage from "../../../shared/components/LoadingPage";
import { Col, Row, Tabs } from "antd";
import WarehouseDetail from "../components/WarehouseDetail";

function WarehouseDetailPage() {
    const { warehouseId } = useParams();
    const [warehouse, setWarehouse] = useState();
    const navigate = useNavigate();

    // Get warehouses
    useEffect(() => {
        const fetchWarehouses = async () => {
          try {
            const response = await warehouseApi.getWarehouseDetail(warehouseId);
            setWarehouse(response.data.data); 
          } catch (err) {
            navigate('/');
            notificationHelper.showErrorNotification({description : err.response.data.message})
          } 
        };
    
        fetchWarehouses();
    }, [warehouseId, navigate]);

    const items = [
        {
          key: '1',
          label: 'Overview',
          children: <WarehouseOverview  warehouse={warehouse}/>,
        },
        {
          key: '2',
          label: 'Inventory',
          children: <WarehouseInventory warehouse={warehouse}/>,
        },
    ];

    return (
        <DetailPage.Layout>
            {
                warehouse ? ( 
                    <>
                        {/* Header */}
                        <DetailPage.Subheader 
                            title={warehouse.name}
                            id={warehouse.id}
                            backLink="/warehouses"
                        >
                            <WarehouseAction warehouse={warehouse} className="bg-white"/>
                        </DetailPage.Subheader>
    
                        {/* Content */}
                        <Tabs defaultActiveKey="1" items={items} />
                    </>
                    
                ) 
                :  <LoadingPage />
            }
        </DetailPage.Layout>
        );
}

function WarehouseOverview ({warehouse}) {
    return (
        <Row gutter={24}>
            <Col span={14}>
                <WarehouseDetail.Infor warehouse={warehouse}/>
            </Col>
            <Col span={10}>
                {/* <ProductDetail.DetailsPanel product={product}/> */}
            </Col>
        </Row>
    )
}

function WarehouseInventory ({warehouse}) {

}

export default WarehouseDetailPage;