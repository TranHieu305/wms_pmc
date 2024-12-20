import { Divider, Tabs } from "antd";
import DetailPage from "../../../shared/components/DetailPage";
import ProductCategoryTypeTag from "./ProductCategoryTypeTag";
import ProductWarehouseForProductBoard from "./ProductWarehouseBoard";
import ProductOrderItemBoard from "./ProductOrderItemBoard";
import ProductBatchItemBoard from "./ProductBatchItemBoard";

function Info({product}) {
    return (
        <DetailPage.DetailContainer>
            <DetailPage.InfoCard>
                <DetailPage.InfoCardTitle>Information</DetailPage.InfoCardTitle>
                <Divider />

                {/* Info Items */}
                <div className="space-y-4">
                    <DetailPage.InfoItem label="Name" value={product.name}></DetailPage.InfoItem>
                    <DetailPage.InfoItem label="Code" value={product.code}></DetailPage.InfoItem>
                    <DetailPage.InfoItem label="Category">
                        {product.productCategory.name} - <ProductCategoryTypeTag category={product.productCategory}/>
                    </DetailPage.InfoItem>
                    <DetailPage.InfoItem label="Quantity" value={product.quantity}></DetailPage.InfoItem>
                    <DetailPage.InfoItem label="Unit" value={product.uom}></DetailPage.InfoItem>
                    <DetailPage.InfoItem label="Description" value={product.description}></DetailPage.InfoItem>
                </div>
            </DetailPage.InfoCard>
        </DetailPage.DetailContainer>
    )
}

function DetailsPanel({product}) {
    const items = [
        {
          key: '1',
          label: 'Inventory',
          children: <ProductWarehouseForProductBoard product={product}/>,
        },
        {
          key: '2',
          label: 'Order',
          children: <ProductOrderItemBoard product={product}/>,
        },
        {
          key: '3',
          label: 'Batch',
          children: <ProductBatchItemBoard product={product}/>,
        },
    ];

    return (
        <DetailPage.DetailContainer>
            <Tabs defaultActiveKey="1" items={items} />
        </DetailPage.DetailContainer>
    )
}


const ProductDetail = {
    Info,
    DetailsPanel
}

export default ProductDetail;