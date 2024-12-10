import { useEffect, useState } from "react";
import productCategoryApi from "../api/productCategoryApi";
import { notificationHelper } from "../../../shared/utils/notificationHelper";
import SubheaderBoardPage from "../../../shared/components/SubHeaderBoardPage";
import SharedIcon from "../../../shared/components/common/Icon";
import ProductCategoryBoard from "../components/ProductCategoryBoard";
import { ProductCategoryBtnSave } from "../components/ProductCategoryButton";


function ProductCategoryBoardPage() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Get all partners
    useEffect(() => {
        const fetchWarehouses = async () => {
          try {
            const response = await productCategoryApi.getAllProductCategory();
            setCategories(response.data.data); 
          } catch (err) {
            notificationHelper.showErrorNotification({description : err.response.data.message})
          } finally {
            setLoading(false);
          }
        };
    
        fetchWarehouses();
    }, []);

    return (
    <>
        {/* Subheader */}
        <SubheaderBoardPage 
            icon={(<SharedIcon.Product width={24} height={24} fill="rgba(0, 167, 111, 1)"></SharedIcon.Product>)}
            title = "Category"
        >
            <ProductCategoryBtnSave />
        </SubheaderBoardPage>
     
        {/* Table */}
        <ProductCategoryBoard categories={categories} loading={loading}></ProductCategoryBoard>;
    </>)

}

export default ProductCategoryBoardPage;