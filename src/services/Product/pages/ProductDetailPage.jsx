import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { notificationHelper } from "../../../shared/utils/notificationHelper";

import productApi from "../api/productApi";
import LoadingPage from "../../../shared/components/LoadingPage";
import ProductAction from "../components/ProductAction";
import DetailPage from "../../../shared/components/DetailPage";
import { Col, Row } from "antd";
import ProductDetail from "../components/ProductDetail";
import productActionPermission from "../utils/actionPermission";
import { useLayoutContext } from "../../../shared/components/AppLayout";
import Enum from "../../../shared/utils/enum";

function ProductDetailPage() {
    const { productId } = useParams();
    const [product, setProduct] = useState();
    const navigate = useNavigate();
    const {setSelectedMenuKey, setBreadcrumbItems, setOpenMenuKey} = useLayoutContext();

    useEffect(() => {
        setOpenMenuKey([Enum.Menu.product.key]);
        setSelectedMenuKey(Enum.Menu.products.key);
        setBreadcrumbItems([
            {
                title: Enum.Menu.product.label,
            },
            {
                title: Enum.Menu.products.label,
            },
            {
                title: "Product detail",
            },
        ]);
    }, [setSelectedMenuKey, setBreadcrumbItems, setOpenMenuKey]);

    // Get products
    useEffect(() => {
        const fetchProducts = async () => {
          try {
            const response = await productApi.getProductDetail(productId);
            setProduct(response.data.data); 
          } catch (err) {
            navigate('/');
            notificationHelper.showErrorNotification({description : err.response.data.message})
          } 
        };
    
        fetchProducts();
    }, [productId, navigate]);

    return (
    <DetailPage.Layout>
        {
            product ? ( 
                <>
                    {/* Header */}
                    <DetailPage.Subheader 
                        title={product.name}
                        id={product.id}
                        backLink="/products"
                    >
                        {
                            productActionPermission.canAction()
                            && <ProductAction product={product} className="bg-white"/>
                        }
                    </DetailPage.Subheader>
                    
                    {/* Content */}
                    {
                        productActionPermission.viewOnlyGeneral() ?
                           ( <Row gutter={24}>
                                <Col span={12}>
                                    <ProductDetail.Info product={product}/>
                                </Col>
                            </Row>)
                        : ( <Row gutter={24}>
                                <Col span={12}>
                                    <ProductDetail.Info product={product}/>
                                </Col>
                                <Col span={12}>
                                    <ProductDetail.DetailsPanel product={product}/>
                                </Col>
                            </Row>)
                    }
                  
                </>
                
            ) 
            :  <LoadingPage />
        }
    </DetailPage.Layout>
    );
}

export default ProductDetailPage;