import { Button, Space, Tabs } from "antd";
import { Link, useLoaderData } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { ProductDetail } from "../../components/product";
import { ProductPriceBoard } from "../../components/productprice";

export default function ProductDetailPage() {
	const data = useLoaderData();
	const { product, categories, productPrices } = data;
	console.log(data);

	const tabItems = [
		{
			key: "info",
			label: "Information",
			children: "tab1",
		},
		{
			key: "price",
			label: "Price",
			children: <ProductPriceBoard product={product} />,
		},
	];
	return (
		<div className="save-page">
			<Link to="/products">
				<Button type="dash" icon={<ArrowLeftOutlined />} className="back-button">
					Products
				</Button>
			</Link>

			<Space size={20} direction="vertical" className="page-container">
				<div className="page-title">Product: {product.name}</div>
			</Space>
			<Tabs defaultActiveKey="info" items={tabItems} />
		</div>
	);
}
