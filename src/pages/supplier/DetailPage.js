import { useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";
import { Space, Button, Flex, Breadcrumb } from "antd";
import { ArrowLeftOutlined, HomeOutlined, ProductOutlined } from "@ant-design/icons";
import { SupplierDetail } from "../../components/supplier";
import SupplierActions from "../../components/supplier/Actions";

function SupplierDetailPage() {
	const { supplier, productPrices, orders } = useLoaderData();
	return (
		<>
			<div>
				<Link to="/suppliers">
					<Button type="link" icon={<ArrowLeftOutlined />} style={{ paddingLeft: "0px" }}>
						Suppliers
					</Button>
				</Link>
				<Flex gap="small" wrap justify="space-between" align="center">
					<h1 style={{ margin: 0 }}>Supplier: {supplier.name}</h1>
					<Flex gap="small">
						<SupplierActions supplier={supplier} type="primary" label="Actions" />
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
									<span>Suppliers</span>
								</>
							),
						},
						{
							title: "Supplier Detail",
						},
					]}
				/>
			</div>

			<SupplierDetail supplier={supplier} productPrices={productPrices} orders={orders} />
		</>
	);
}

export default SupplierDetailPage;
