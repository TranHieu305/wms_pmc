import { useEffect, useState } from "react";
import { notificationHelper } from "../../../shared/utils/notificationHelper";
import SharedIcon from "../../../shared/components/common/Icon";
import productApi from "../api/productApi";
import ProductBoard from "../components/ProductBoard";
import { ProductBtnSave } from "../components/ProductButton";
import BoardPage from "../../../shared/components/BoardPage";
import productActionPermission from "../utils/actionPermission";

function ProductBoardPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Get all partners
    useEffect(() => {
        const fetchProducts = async () => {
          try {
            const response = await productApi.getAllProducts();
            setProducts(response.data.data); 
          } catch (err) {
            notificationHelper.showErrorNotification({description : err.response.data.message})
          } finally {
            setLoading(false);
          }
        };
    
        fetchProducts();
    }, []);

    return (
    <BoardPage.ContentContainer>
        {/* Subheader */}
        <BoardPage.Subheader 
            icon={(<SharedIcon.Product width={24} height={24} fill="rgba(0, 167, 111, 1)"></SharedIcon.Product>)}
            title = "All Product"
        >
            {productActionPermission.canAction() && <ProductBtnSave />}
        </BoardPage.Subheader >
     
        {/* Table */}
        <BoardPage.BoardContainer>
            <ProductBoard products={products} loading={loading}></ProductBoard>
        </BoardPage.BoardContainer>
    </BoardPage.ContentContainer>)

}

export default ProductBoardPage;