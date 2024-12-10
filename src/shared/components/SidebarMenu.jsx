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
	];
    return (      
    <Sider class="h-screen bg-[#212B36]">
         {/* Logo Section */}
         <div className="flex items-center bg-[#212B36] p-[1.25rem]">
                <img
                    src="/svgs/logo.svg"
                    alt="Logo"
                    className="h-20 object-contain"
                />
        </div>
        <Menu theme="dark" 
            defaultSelectedKeys={['1']} 
            mode="inline" 
            onClick={(item) => navigate(item.key)} 
            items={menuItems}
        />
    </Sider>
  )
}

export {SiderMenu}
