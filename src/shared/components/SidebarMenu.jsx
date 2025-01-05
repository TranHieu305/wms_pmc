import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import SharedIcon from "./common/Icon";
import "../styles/SidebarMenu.css";
import Sider from "antd/es/layout/Sider";


function SiderMenu() {
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
		{
			key: "partners",
			label: "Partners",
			icon: <SharedIcon.Partner />,
		},
        {
			key: "inventory-items",
			label: "Inventory items",
			icon: <SharedIcon.InventoryItem />,
		},
        {
			key: "orders",
			label: "Orders",
			icon: <SharedIcon.Order />,
		},
        {
			key: "shipments",
			label: "Shipments",
			icon: <SharedIcon.Shipment />,
            children: [
				{
					key: "/batches",
					label: "All Batch",
				},
				
			],
		},
        {
			key: "settings",
			label: "Settings",
			icon: <SharedIcon.Setting />,
            children: [
				{
					key: "/users",
					label: "User",
				},
			],
		},
	];
    return (      
    <Sider className="bg-[#212B36]">
         {/* Logo Section */}
         <div className="flex items-center p-[1.25rem]">
                <img
                    src="/svgs/logo.svg"
                    alt="Logo"
                    className="h-20 object-contain"
                />
        </div>
        <Menu theme="dark" 
            defaultSelectedKeys={['warehouses']} 
            mode="inline" 
            onClick={(item) => navigate(item.key)} 
            items={menuItems}
        />
    </Sider>
  )
}

export {SiderMenu}
