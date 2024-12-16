import { Divider, Tabs } from "antd";
import DetailPage from "../../../shared/components/DetailPage";
import ProductCategoryTypeTag from "./ProductCategoryTypeTag";
import ProductWarehouseForProductBoard from "./ProductWarehouseBoard";

function Infor({product}) {
    return (
        <DetailPage.DetailContainer>
            <DetailPage.InforCard>
                <DetailPage.InforCardTitle>Information</DetailPage.InforCardTitle>
                <Divider />

                {/* Info Items */}
                <div className="space-y-4">
                    <DetailPage.InforItem label="Name" value={product.name}></DetailPage.InforItem>
                    <DetailPage.InforItem label="Code" value={product.code}></DetailPage.InforItem>
                    <DetailPage.InforItem label="Category">
                        {product.productCategory.name} - <ProductCategoryTypeTag category={product.productCategory}/>
                    </DetailPage.InforItem>
                    <DetailPage.InforItem label="Quantity" value={product.quantity}></DetailPage.InforItem>
                    <DetailPage.InforItem label="Unit" value={product.uom}></DetailPage.InforItem>
                    <DetailPage.InforItem label="Description" value={product.description}></DetailPage.InforItem>
                </div>
            </DetailPage.InforCard>
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
          label: 'Tab 2',
          children: 'Content of Tab Pane 2',
        },
        {
          key: '3',
          label: 'Tab 3',
          children: 'Content of Tab Pane 3',
        },
    ];

    return (
        <DetailPage.DetailContainer>
            <Tabs defaultActiveKey="1" items={items} />
        </DetailPage.DetailContainer>
    )
}


const ProductDetail = {
    Infor,
    DetailsPanel
}

export default ProductDetail;