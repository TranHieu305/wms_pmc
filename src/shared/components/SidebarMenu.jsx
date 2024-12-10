import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import SharedIcon from "./common/Icon";
import "../styles/SidebarMenu.css";

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

export default SidebarMenu;
