import { Breadcrumb, Button, Flex } from "antd";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { ArrowLeftOutlined, HomeOutlined, ProductOutlined } from "@ant-design/icons";
import { ProductDetail } from "../../components/product/Details";
import ProductActions from "../../components/product/Actions";

export default function ProductDetailPage() {
	const data = useLoaderData();
	const { product, productPrices, suppliers } = data;
	return (
		<>
			<div>
				<Link to="/products">
					<Button type="link" icon={<ArrowLeftOutlined />} style={{ paddingLeft: "0px" }}>
						Products
					</Button>
				</Link>
				<Flex gap="small" wrap justify="space-between" align="center">
					<h1 style={{ margin: 0 }}>Product: {product.name}</h1>
					<Flex gap="small">
						<ProductActions product={product} type="primary" label="Actions" />
					</Flex>
				</Flex>
			</div>

			<div>
				<Breadcrumb
					items={[
						{
							title: <HomeOutlined />,
						},
						{
							title: (
								<>
									<ProductOutlined />
									<span>Products</span>
								</>
							),
						},
						{
							title: "Product Detail",
						},
					]}
				/>
			</div>

			<ProductDetail product={product} prices={productPrices} suppliers={suppliers} />
		</>
	);
}
