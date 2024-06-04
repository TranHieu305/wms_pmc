import "../../styles/pages/detailpage.css";
import "./index.css";
import { Breadcrumb, Button, Flex, message, Popconfirm, Tabs } from "antd";
import { MaterialOrderDetail } from "../../components/materialorder";
import {
	DeleteOutlined,
	EditOutlined,
	HomeOutlined,
	PrinterOutlined,
	ProductOutlined,
	RollbackOutlined,
} from "@ant-design/icons";
import { useLoaderData } from "react-router-dom";

export function MaterialOrderDetailPage() {
	const order = useLoaderData();
	const tabItems = [
		{
			key: "orderOverview",
			label: "Order overview",
			children: <MaterialOrderDetail detail={order} />,
		},
		{
			key: "actionLogs",
			label: "Action Logs",
			children: <>Action Logs</>,
		},
	];

	const confirm = (e) => {
		console.log(e);
		message.success("Deleted");
	};
	const cancel = (e) => {
		console.log(e);
		message.error("Cancel");
	};
	return (
		<>
			<div>
				<Button style={{ marginBottom: 20 }}>
					<RollbackOutlined /> Back
				</Button>
				<Flex gap="small" wrap justify="space-between" align="center">
					<h1 style={{ margin: 0 }}>
						#{order.id} - {order.name}
					</h1>
					<Flex gap="small">
						<Popconfirm
							title="Delete this order"
							description="Are you sure to delete this order?"
							onConfirm={confirm}
							onCancel={cancel}
							okText="Yes"
							cancelText="No"
						>
							<Button danger>
								<DeleteOutlined />
								Delete
							</Button>
						</Popconfirm>
						<Button>
							<PrinterOutlined />
							Print
						</Button>
						<Button type="primary" href={"/add-edit-order/" + order.id}>
							<EditOutlined />
							Edit
						</Button>
					</Flex>
				</Flex>
			</div>
			<div>
				<Breadcrumb
					items={[
						{
							href: "/",
							title: <HomeOutlined />,
						},
						{
							href: "/material-order",
							title: (
								<>
									<ProductOutlined />
									<span>Material Order</span>
								</>
							),
						},
						{
							title: "Material Order",
						},
					]}
				/>
			</div>

			<Tabs defaultActiveKey="info" items={tabItems} />
		</>
	);
}
