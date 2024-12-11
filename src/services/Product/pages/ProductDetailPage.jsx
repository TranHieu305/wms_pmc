import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { notificationHelper } from "../../../shared/utils/notificationHelper";

import productApi from "../api/productApi";
import LoadingPage from "../../../shared/components/LoadingPage";
import ProductAction from "../components/ProductAction";
import DetailPage from "../../../shared/components/DetailPage";
import { Col, Row } from "antd";
import ProductDetail from "../components/ProductDetail";

function ProductDetailPage() {
    const { productId } = useParams();
    const [product, setProduct] = useState();
    const navigate = useNavigate();

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
                        <ProductAction product={product} className="bg-white"/>
                    </DetailPage.Subheader>

                    {/* Content */}
                    <Row gutter={24}>
                        <Col span={12}>
                            <ProductDetail.Infor product={product}/>
                        </Col>
                        <Col span={12}>
                            <ProductDetail.DetailsPanel product={product}/>
                        </Col>
                    </Row>
                </>
                
            ) 
            :  <LoadingPage />
        }
    </DetailPage.Layout>
    );
}

export default ProductDetailPage;