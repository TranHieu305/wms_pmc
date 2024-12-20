import { useEffect, useState } from "react";
import batchItemApi from "../../Batch/api/batchItemApi";
import { notificationHelper } from "../../../shared/utils/notificationHelper";
import { Button, List } from "antd";
import DetailPage from "../../../shared/components/DetailPage";
import { Link } from "react-router-dom";
import SharedIcon from "../../../shared/components/common/Icon";
import dataHelper from "../../../shared/utils/dataHelper";

function ProductBatchItemBoard({product}) {
    const [batchItems, setBatchItems] = useState([]);
    const [loading, setLoading] = useState(true);

    // Get all partners
    useEffect(() => {
        const fetchBatchItems = async () => {
          try {
            const response = await batchItemApi.findByProductId(product.id);
            setBatchItems(response.data.data); 
          } catch (err) {
            notificationHelper.showErrorNotification({message : "Cannot get batch items"})
          } finally {
            setLoading(false);
          }
        };
    
        fetchBatchItems();
    }, [product]);

    return (
        <div className="pb-4">
            <div>
                <h2 className="text-base font-semibold text-gray-800 p-4">Batch</h2>
            </div>
            <List 
                className="px-5"
                itemLayout="horizontal"
                dataSource={batchItems}
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
                                <Link to={`/batches/${item.batchId}`}> 
                                    <Button type="link" icon={<SharedIcon.Shipment width={18} height={18} fill="rgba(0, 167, 111, 1)"/>}>
                                        Batch ID: {item.batchId}
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

export default ProductBatchItemBoard;