import { useEffect, useState } from "react";
import orderItemApi from "../../Order/api/orderItemApi";
import { notificationHelper } from "../../../shared/utils/notificationHelper";
import { Button, List } from "antd";
import DetailPage from "../../../shared/components/DetailPage";
import { Link } from "react-router-dom";
import SharedIcon from "../../../shared/components/common/Icon";
import dataHelper from "../../../shared/utils/dataHelper";

function ProductOrderItemBoard({product}) {
    const [orderItems, setOrderItems] = useState([]);
    const [loading, setLoading] = useState(true);

    // Get all partners
    useEffect(() => {
        const fetchOrderItems = async () => {
          try {
            const response = await orderItemApi.findByProductId(product.id);
            setOrderItems(response.data.data); 
          } catch (err) {
            notificationHelper.showErrorNotification({message : "Cannot get order items"})
          } finally {
            setLoading(false);
          }
        };
    
        fetchOrderItems();
    }, [product]);

    return (
        <div className="pb-4">
            <div>
                <h2 className="text-base font-semibold text-gray-800 p-4">Order</h2>
            </div>
            <List 
                className="px-5"
                itemLayout="horizontal"
                dataSource={orderItems}
                renderItem={(item, index) => (
                    <List.Item
                        key={item.id}
                        extra={
                            <div className="flex flex-col items-start gap-2">
                                <span>{dataHelper.formatDateTime(item.createdAt)}</span>
                            </div>
                        }
                        >
                        <List.Item.Meta
                            title={<DetailPage.InfoItem label={(
                                <Link to={`/orders/${item.orderId}`}> 
                                    <Button type="link" icon={<SharedIcon.Order width={18} height={18} fill="rgba(0, 167, 111, 1)"/>}>
                                        Order ID: {item.orderId}
                                    </Button>
                                </Link>
                            )}></DetailPage.InfoItem>}
                            description={
                                <div className="font-semibold">
                                    Quantity: {item.quantity} {item.product.uom}
                                </div>}
                        />
                    </List.Item>
                )}

                loading={loading}
                pagination={{
                    pageSize: 10,
                  }}
            />
        </div>
    )
}

export default ProductOrderItemBoard;