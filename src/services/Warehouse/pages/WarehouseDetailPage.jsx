import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { notificationHelper } from "../../../shared/utils/notificationHelper";
import warehouseApi from "../api/warehouseApi";
import DetailPage from "../../../shared/components/DetailPage";
import WarehouseAction from "../components/WarehouseAction";
import LoadingPage from "../../../shared/components/LoadingPage";
import { Col, Row, Tabs } from "antd";
import WarehouseDetail from "../components/WarehouseDetail";
import productWarehouseApi from "../../Product/api/productWarehouseApi";
import WarehouseStatusTag from "../components/WarehouseStatusTag";
import productWarehouseHistoryApi from "../../Product/api/productWarehouseHistoryApi";

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
          label: 'Inventory',
          children: <WarehouseInventory  warehouse={warehouse}/>,
        },
        {
          key: '2',
          label: 'History',
          children: <WarehouseHistory warehouse={warehouse}/>,
        },
    ];

    return (
        <DetailPage.Layout>
            {
                warehouse ? ( 
                    <>
                        {/* Header */}
                        <DetailPage.Subheader 
                            title={
                                <div className="flex flex-row">
                                    {warehouse.name}
                                    <div className="px-2">
                                        <WarehouseStatusTag warehouse={warehouse}/>
                                    </div>
                                </div>
                            }
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

function WarehouseInventory ({warehouse}) {
    const [productWarehouses, setProductWarehouses] = useState([]);
    const [loading, setLoading] = useState(true);
    

    // Get product warehouses
    useEffect(() => {
        const fetchProductWarehouse = async (warehouse) => {
          try {
            const response = await productWarehouseApi.getByWarehouseId(warehouse.id);
            setProductWarehouses(response.data.data); 
          } catch (err) {
            notificationHelper.showErrorNotification({description : err.response.data.message})
          } finally {
            setLoading(false);
          }
        };
    
        fetchProductWarehouse(warehouse);
    }, [warehouse]);

    return (
        <Row gutter={24}>
            <Col span={18}>
                <WarehouseDetail.Inventory 
                    warehouse={warehouse} 
                    productWarehouses={productWarehouses} 
                    loading={loading}
                />
            </Col>
            <Col span={6}>
                <WarehouseDetail.Infor warehouse={warehouse}/>
            </Col>
        </Row>
    )
}

function WarehouseHistory ({warehouse}) {
    const [histories, setHistories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async (warehouse) => {
          try {
            const response = await productWarehouseHistoryApi.getByWarehouseId(warehouse.id);
            setHistories(response.data.data); 
          } catch (err) {
            notificationHelper.showErrorNotification({description : err.response.data.message})
          } finally {
            setLoading(false);
          }
        };
    
        fetchData(warehouse);
    }, [warehouse]);

    return (
        <WarehouseDetail.History histories={histories} loading={loading}/>
    )
}

export default WarehouseDetailPage;