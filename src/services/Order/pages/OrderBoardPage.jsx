import { useEffect, useState } from "react";
import { notificationHelper } from "../../../shared/utils/notificationHelper";
import SharedIcon from "../../../shared/components/common/Icon";
import orderApi from "../api/orderApi";
import BoardPage from "../../../shared/components/BoardPage";
import OrderBoard from "../components/OrderBoard";
import { OrderBtnSave } from "../components/OrderButton";
import orderActionPermission from "../utils/actionPermission";
import { useLayoutContext } from "../../../shared/components/AppLayout";
import Enum from "../../../shared/utils/enum";

function OrderBoardPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const {setSelectedMenuKey, setBreadcrumbItems} = useLayoutContext();

    useEffect(() => {
        setSelectedMenuKey(Enum.Menu.order.key);
        setBreadcrumbItems([
            {
                title: Enum.Menu.order.label,
            },
        ]);
    }, [setSelectedMenuKey, setBreadcrumbItems]);

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
    <BoardPage.ContentContainer>
        {/* Subheader */}
        <BoardPage.Subheader 
            icon={(<SharedIcon.Order width={24} height={24} fill="rgba(0, 167, 111, 1)"></SharedIcon.Order>)}
            title = "All Order"
        >
            {orderActionPermission.canAdd() && <OrderBtnSave />}
        </BoardPage.Subheader >
     
        {/* Table */}
        <BoardPage.BoardContainer>
            <OrderBoard orders={orders} loading={loading}></OrderBoard>
        </BoardPage.BoardContainer>
    </BoardPage.ContentContainer>)
}

export default OrderBoardPage;