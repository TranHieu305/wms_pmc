import { useEffect, useState } from "react";
import productCategoryApi from "../api/productCategoryApi";
import { notificationHelper } from "../../../shared/utils/notificationHelper";
import SharedIcon from "../../../shared/components/common/Icon";
import ProductCategoryBoard from "../components/ProductCategoryBoard";
import { ProductCategoryBtnSave } from "../components/ProductCategoryButton";
import BoardPage from "../../../shared/components/BoardPage";
import productActionPermission from "../utils/actionPermission";
import { useLayoutContext } from "../../../shared/components/AppLayout";
import Enum from "../../../shared/utils/enum";


function ProductCategoryBoardPage() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const {setSelectedMenuKey, setBreadcrumbItems} = useLayoutContext();

    useEffect(() => {
        setSelectedMenuKey(Enum.Menu.productCategory.key);
        setBreadcrumbItems([
            {
                title: Enum.Menu.product.label,
            },
            {
                title: "Category",
            },
        ]);
    }, [setSelectedMenuKey, setBreadcrumbItems]);


    // Get all categories
    useEffect(() => {
        const fetchCategories = async () => {
          try {
            const response = await productCategoryApi.getAllProductCategory();
            setCategories(response.data.data); 
          } catch (err) {
            notificationHelper.showErrorNotification({description : err.response.data.message})
          } finally {
            setLoading(false);
          }
        };
    
        fetchCategories();
    }, []);

    return (
    <BoardPage.ContentContainer>
        {/* Subheader */}
        <BoardPage.Subheader
            icon={(<SharedIcon.Product width={24} height={24} fill="rgba(0, 167, 111, 1)"></SharedIcon.Product>)}
            title = "Category"
        >
            {productActionPermission.canAction() && <ProductCategoryBtnSave />}
        </BoardPage.Subheader >
     
        {/* Table */}
        <BoardPage.BoardContainer>
            <ProductCategoryBoard categories={categories} loading={loading}></ProductCategoryBoard>
        </BoardPage.BoardContainer>
    </BoardPage.ContentContainer>)

}

export default ProductCategoryBoardPage;