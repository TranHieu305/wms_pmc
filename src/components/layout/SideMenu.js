import { Button, Menu } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LuWarehouse } from "react-icons/lu";
import { AiOutlineMenu } from "react-icons/ai";
import { AppstoreOutlined } from "@ant-design/icons";

import "../../styles/layout.css";
import Sider from "antd/es/layout/Sider";

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
				<Button icon={<AiOutlineMenu />}></Button>
			</div>
			<Menu
				className="sidemenu-vertical"
				mode="vertical"
				onClick={(item) => navigate(item.key)}
				selectedKeys={[selectedKeys]}
				items={[
					{ label: "Warehouse", key: "/warehouses", icon: <LuWarehouse /> },
					{ label: "Warehouse", key: "/warehouse2", icon: <AppstoreOutlined /> },
					{ label: "Warehouse", key: "/warehouse3", icon: <AppstoreOutlined /> },
				]}
			></Menu>
		</div>
	);
}

export default SideMenu;
