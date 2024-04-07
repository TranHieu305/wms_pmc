import { Layout, Menu, Space, Table, Typography } from "antd";
import { PauseOutlined } from "@ant-design/icons";
// import Header from "../header";

import "./index.css";
import { Link } from "react-router-dom";

const { Sider } = Layout;

export default function Sidebar() {
	return (
		<Layout>
			<Sider className="sidebar">
				Sidebar
				<Menu theme="dark" mode="inline">
					<Menu.Item key="home" icon={<PauseOutlined />}>
						<Link to="home">Home</Link>
					</Menu.Item>
					<Menu.Item key="home2" icon={<PauseOutlined />}>
						Home
					</Menu.Item>
					<Menu.Item key="home3" icon={<PauseOutlined />}>
						Home
					</Menu.Item>
					<Menu.SubMenu key="subtasks" icon={<PauseOutlined />} title="Submenu">
						<Menu.Item key="home4" icon={<PauseOutlined />}>
							Home
						</Menu.Item>
						<Menu.Item key="home5" icon={<PauseOutlined />}>
							Home
						</Menu.Item>
					</Menu.SubMenu>
				</Menu>
			</Sider>
			{/* <Header title="Header" subtitle="Sub header" /> */}

			{/* Table test  */}
			<Space size={20}>
				<Typography.Title level={4}>Warehouse</Typography.Title>
				<Table
					columns={[
						{
							title: "title",
							dataIndex: "title",
						},
						{
							title: "price",
							dataIndex: "price",
						},
						{
							title: "price",
							dataIndex: "price",
						},
						{
							title: "title",
							dataIndex: "title",
						},
						{
							title: "title",
							dataIndex: "title",
						},
					]}
				></Table>
			</Space>
		</Layout>
	);
}
