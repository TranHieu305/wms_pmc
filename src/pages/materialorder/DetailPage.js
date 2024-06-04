import "../../styles/pages/detailpage.css";
import "./index.css";
import { Breadcrumb, Button, Flex } from "antd";
import { MaterialOrderDetail } from "../../components/materialorder";
import { ArrowLeftOutlined, HomeOutlined, ProductOutlined } from "@ant-design/icons";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import MaterialOrderActions from "../../components/materialorder/Actions";

export function MaterialOrderDetailPage() {
	const order = useLoaderData();
	const navigate = useNavigate();
	// const tabItems = [
	// 	{
	// 		key: "orderOverview",
	// 		label: "Order overview",
	// 		children: <MaterialOrderDetail detail={order} />,
	// 	},
	// 	{
	// 		key: "actionLogs",
	// 		label: "Action Logs",
	// 		children: <>Action Logs</>,
	// 	},
	// ];

	return (
		<>
			<div>
				<Link to="/material-orders">
					<Button type="link" icon={<ArrowLeftOutlined />} style={{ paddingLeft: "0px" }}>
						Material Orders
					</Button>
				</Link>
				<Flex gap="small" wrap justify="space-between" align="center">
					<h1 style={{ margin: 0 }}>{order.name}</h1>
					<Flex gap="small">
						<MaterialOrderActions
							order={order}
							type="primary"
							label="Edit"
							onClick={() => navigate("/material-orders/" + order.id + "/edit")}
						/>
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
									<span>Material Order</span>
								</>
							),
						},
						{
							title: "Material Order Detail",
						},
					]}
				/>
			</div>

			{/* <Tabs defaultActiveKey="info" items={tabItems} /> */}
			<MaterialOrderDetail detail={order} />
		</>
	);
}
