import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import SharedIcon from "./common/Icon";
import "../styles/SidebarMenu.css";
import Sider from "antd/es/layout/Sider";
import Enum from "../utils/enum";


function SiderMenu() {
    const navigate = useNavigate();

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
            items={getMenuItems()}
        />
    </Sider>
  )
}

const getMenuItems = () => {
    let menuItems = [];

    const currentUser = JSON.parse(localStorage.getItem("user"));

    if (currentUser.authorities.includes(Enum.UserRole.ADMIN)) {
        menuItems = [
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
                        label: "Batches",
                    },
                    {
                        key: "/shipments",
                        label: "Shipments",
                    },
                    {
                        key: "/vehicles",
                        label: "Vehicles",
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
                        label: "Users",
                    },
                ],
            },
        ];
    }

    if (currentUser.authorities.includes(Enum.UserRole.ACCOUNTANT) || 
        currentUser.authorities.includes(Enum.UserRole.WAREHOUSE_MANAGER)) {
            menuItems = [
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
                            label: "Batches",
                        },
                        {
                            key: "/shipments",
                            label: "Shipments",
                        },
                        {
                            key: "/vehicles",
                            label: "Vehicles",
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
                            label: "Users",
                        },
                    ],
                },
            ];
    }

    if (currentUser.authorities.includes(Enum.UserRole.USER)) {
        menuItems = [
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
                key: "orders",
                label: "Orders",
                icon: <SharedIcon.Order />,
            },
            {
                key: "/batches",
                label: "Batches",
                icon: <SharedIcon.Shipment />,
            },
            {
                key: "/shipments",
                label: "Shipments",
                icon: <SharedIcon.Shipment />,
            },
            {
                key: "/users",
                label: "Users",
                icon: <SharedIcon.Partner />,
            },
        ];
    }

    return menuItems;
}

export {SiderMenu}
