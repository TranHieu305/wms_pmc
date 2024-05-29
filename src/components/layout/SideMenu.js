import { Avatar, Button, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { AiOutlineMenu, AiOutlineSetting } from "react-icons/ai";
import { TeamOutlined } from "@ant-design/icons";
import { BiLogOutCircle } from "react-icons/bi";
import "../../styles/layout.css";

function SideMenu() {
	const navigate = useNavigate();

	// Menu Items
	const menuItems = [
		{
			key: "warehouse",
			label: "Warehouse",
			icon: <TeamOutlined />,
			children: [
				{
					key: "/",
					label: "Product Warehouse",
					danger: true,
				},
				{
					key: "/",
					label: "Warehouse",
					danger: true,
				},
			],
		},
		{
			key: "inventory",
			label: "Inventory ",
			icon: <TeamOutlined />,
			children: [
				{
					key: "/",
					label: "Inventory Item",
					danger: true,
				},
				{
					key: "/",
					label: "Inventory Item Detail",
					danger: true,
				},
			],
		},
		{
			key: "partner",
			label: "Partner",
			icon: <TeamOutlined />,
			children: [
				{
					key: "/suppliers",
					label: "Supplier",
				},
				{
					key: "/",
					label: "Customer",
					danger: true,
				},
			],
		},
		{
			key: "product",
			label: "Product",
			icon: <TeamOutlined />,
			children: [
				{
					key: "/suppliers",
					label: "Product",
					danger: true,
				},
				{
					key: "/product-categories",
					label: "Category",
				},
			],
		},
	];

	return (
		<div className="sidemenu">
			<div className="sidemenu-header">
				<Button icon={<AiOutlineMenu />} type="dash"></Button>
			</div>

			{/* User infor */}
			<div className="sidemenu-user">
				<div className="sidemenu-user-container">
					<Avatar
						size={60}
						className="avatar"
						style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}
					>
						U
					</Avatar>
					<span>User</span>
				</div>
			</div>

			{/* Side menu */}
			<div className="sidemenu-main">
				<Menu
					className="sidemenu-vertical"
					onClick={(item) => navigate(item.key)}
					mode="inline"
					defaultSelectedKeys={["1"]}
					defaultOpenKeys={["sub1"]}
					items={menuItems}
				/>
			</div>

			{/* Logout and setting */}

			<div className="sidemenu-footer">
				<Button shape="round" icon={<BiLogOutCircle />}>
					Logout
				</Button>
				<Button shape="round" icon={<AiOutlineSetting />}>
					Setting
				</Button>
			</div>
		</div>
	);
}

export default SideMenu;
