import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import SharedIcon from "./common/Icon";
import "../styles/SidebarMenu.css";
import { useState } from "react";
import Sider from "antd/es/layout/Sider";
import { UserOutlined } from "@ant-design/icons";

function SidebarMenu() {
	const navigate = useNavigate();

	// Menu Items
	const menuItems = [
		{
			key: "warehouses",
			label: "Warehouses",
			icon: <SharedIcon.Warehouse />,
		
		},
		{
			key: "product",
			label: "Products",
			icon: <SharedIcon.Product />,
			
		},
		{
			key: "partners",
			label: "Partners",
			icon: <SharedIcon.Partner />,
			
		},
		
		{
			key: "product123",
			label: "Product",
			// icon: < />,
			children: [
				{
					key: "/products",
					label: "All Product",
				},
				{
					key: "/product-categories",
					label: "Category",
				},
			],
		},
	];

	return (
        <div className="w-[15.625rem] p-[1.25rem] h-screen bg-[#212B36] text-white">
            {/* Logo Section */}
            <div className="flex items-center bg-[#212B36] pb-[30px]">
                <img
                    src="/svgs/logo.svg"
                    alt="Logo"
                    className="h-20 object-contain"
                />
            </div>
            {/* Side menu */}
            <Menu
                className="sidebar-menu"
                onClick={(item) => navigate(item.key)}
                mode="inline"
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                items={menuItems}
            />
        </div>
	);
}

function SiderMenu() {
    const [collapsed, setCollapsed] = useState(false);
    function getItem(label, key, icon, children) {
        return {
          key,
          icon,
          children,
          label,
        };
      }
    const items = [
        getItem('Option 1', '1', <UserOutlined />),
        getItem('Option 2', '2', <UserOutlined />),
        getItem('User', 'sub1', <UserOutlined />, [
          getItem('Tom', '3'),
          getItem('Bill', '4'),
          getItem('Alex', '5'),
        ]),
        getItem('Team', 'sub2', <UserOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
        getItem('Files', '9', <UserOutlined />),
    ];

    return (      
    <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} class="min-h-screen">
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
    </Sider>
  )
}

export default SidebarMenu;

export {SiderMenu}
