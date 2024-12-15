import { useEffect, useState } from "react";
import { notificationHelper } from "../../../shared/utils/notificationHelper";
import SharedIcon from "../../../shared/components/common/Icon";
import orderApi from "../api/orderApi";
import BoardPage from "../../../shared/components/BoardPage";
import OrderBoard from "../components/OrderBoard";
import { OrderBtnSave } from "../components/OrderButton";

function OrderBoardPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Get all partners
    useEffect(() => {
        const fetchOrders = async () => {
          try {
            const response = await orderApi.getAllOrders();
            setOrders(response.data.data); 
          } catch (err) {
            notificationHelper.showErrorNotification({description : err.response.data.message})
          } finally {
            setLoading(false);
          }
        };
    
        fetchOrders();
    }, []);

    return (
    <>
        {/* Subheader */}
        <BoardPage.Subheader 
            icon={(<SharedIcon.Order width={24} height={24} fill="rgba(0, 167, 111, 1)"></SharedIcon.Order>)}
            title = "All Order"
        >
            <OrderBtnSave />
        </BoardPage.Subheader >
     
        {/* Table */}
        <OrderBoard orders={orders} loading={loading}></OrderBoard>
    </>)
}

export default OrderBoardPage;