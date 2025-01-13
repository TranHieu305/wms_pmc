import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import orderApi from "../api/orderApi";
import { notificationHelper } from "../../../shared/utils/notificationHelper";
import DetailPage from "../../../shared/components/DetailPage";
import OrderAction from "../components/OrderAction";
import { Col, Row } from "antd";
import LoadingPage from "../../../shared/components/LoadingPage";
import OrderDetail from "../components/OrderDetail";
import { OrderStatusTag } from "../components/OrderTag";
import orderActionPermission from "../utils/actionPermission";

function OrderDetailPage() {
    const {orderId} = useParams();
    const [order, setOrder] = useState();
    const navigate = useNavigate();

    // Get orders
    useEffect(() => {
        const fetchProducts = async () => {
          try {
            const response = await orderApi.getOrderDetail(orderId);
            setOrder(response.data.data); 
          } catch (err) {
            navigate('/');
            notificationHelper.showErrorNotification({description : err.response.data.message})
          } 
        };
    
        fetchProducts();
    }, [orderId, navigate]);
    
    return (
        <DetailPage.Layout>
            {
                order ? ( 
                    <>
                        {/* Header */}
                        <DetailPage.Subheader 
                            title={
                                <div className="flex flex-row">
                                    {order.name}
                                    <div className="px-2">
                                        <OrderStatusTag status={order.status}/>
                                    </div>
                                </div>
                            }
                            id={order.id}
                            backLink="/orders"
                        >
                            {!orderActionPermission.viewOnly() && <OrderAction order={order} className="bg-white"/>}      
                        </DetailPage.Subheader>
    
                        {/* Content */}
                        <Row gutter={24}>
                            <Col span={18}>
                                <OrderDetail.OrderItemBoard order={order} />
                            </Col>
                            <Col span={6}>
                                <OrderDetail.Info order={order} />
                            </Col>
                        </Row>
                    </>
                    
                ) 
                :  <LoadingPage />
            }
        </DetailPage.Layout>
        );
}

export default OrderDetailPage;