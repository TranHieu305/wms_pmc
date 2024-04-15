import { Avatar, Button, Menu } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LiaWarehouseSolid } from "react-icons/lia";
import { AiOutlineMenu, AiOutlineSetting } from "react-icons/ai";
import { TeamOutlined } from "@ant-design/icons";
import { BiLogOutCircle } from "react-icons/bi";
import "../../styles/layout.css";

function SideMenu() {
	const location = useLocation();
	const navigate = useNavigate();
	const [selectedKeys, setSelectedKeys] = useState("/");

	useEffect(() => {
		const pathname = location.pathname;
		setSelectedKeys(pathname);
	}, [location.pathname]);

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
					mode="vertical"
					onClick={(item) => navigate(item.key)}
					selectedKeys={[selectedKeys]}
					items={[
						{ label: "Warehouse", key: "/warehouses", icon: <LiaWarehouseSolid /> },
						// { label: "Supplier", key: "/suppliers", icon: <TeamOutlined /> },
						{ label: "Customer", key: "/customers", icon: <TeamOutlined /> },
					]}
				></Menu>
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
