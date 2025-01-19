import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import SharedIcon from "./common/Icon";
import "../styles/SidebarMenu.css";
import Sider from "antd/es/layout/Sider";
import Enum from "../utils/enum";
import { useLayoutContext } from "./AppLayout";


function SiderMenu() {
    const navigate = useNavigate();
    const { selectedMenuKey, setSelectedMenuKey, openMenuKey, setOpenMenuKey } = useLayoutContext();

    const handleMenuClick = (item) => {
        setSelectedMenuKey(item.key); // Update the selected key
        navigate(item.key); // Navigate to the route
    };

     // Handle submenu open state
  const handleOpenChange = (keys) => {
    setOpenMenuKey(keys); // Updates the currently open submenu(s)
  };

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
            mode="inline" 
            items={getMenuItems()}
            selectedKeys={[selectedMenuKey]} // Controls selected menu item
            openKeys={openMenuKey} // Controls open submenu(s)
            onClick={handleMenuClick} // Handles menu item clicks
            onOpenChange={handleOpenChange} // Handles submenu open/close events
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
                key: Enum.Menu.warehouse.key,
                label: Enum.Menu.warehouse.label,
                icon: <SharedIcon.Warehouse />,
            
            },
            {
                key: Enum.Menu.product.key,
                label: Enum.Menu.product.label,
                icon: <SharedIcon.Product />,
                children: [
                    {
                        key: Enum.Menu.products.key,
                        label: Enum.Menu.products.label,
                    },
                    {
                        key: Enum.Menu.productCategory.key,
                        label: Enum.Menu.productCategory.label,
                    },
                ],
                
            },
            {
                key: Enum.Menu.partner.key,
                label: Enum.Menu.partner.label,
                icon: <SharedIcon.Partner />,
            },
            {
                key: Enum.Menu.inventoryItem.key,
                label: Enum.Menu.inventoryItem.label,
                icon: <SharedIcon.InventoryItem />,
            },
            {
                key: Enum.Menu.order.key,
                label: Enum.Menu.order.label,
                icon: <SharedIcon.Order />,
            },
            {
                key: Enum.Menu.shipment.key,
                label: Enum.Menu.shipment.label,
                icon: <SharedIcon.Shipment />,
                children: [
                    {
                        key: Enum.Menu.batch.key,
                        label: Enum.Menu.batch.label,
                    },
                    {
                        key: Enum.Menu.shipments.key,
                        label: Enum.Menu.shipments.label,
                    },
                    {
                        key: Enum.Menu.vehicles.key,
                        label: Enum.Menu.vehicles.label,
                    },
                ],
            },
            {
                key: Enum.Menu.setting.key,
                label: Enum.Menu.setting.label,
                icon: <SharedIcon.Setting />,
                children: [
                    {
                        key: Enum.Menu.user.key,
                        label: Enum.Menu.user.label,
                    },
                ],
            },
        ];
    }

    if (currentUser.authorities.includes(Enum.UserRole.ACCOUNTANT) || 
        currentUser.authorities.includes(Enum.UserRole.WAREHOUSE_MANAGER)) {
            menuItems = [
                {
                    key: Enum.Menu.warehouse.key,
                    label: Enum.Menu.warehouse.label,
                    icon: <SharedIcon.Warehouse />,
                
                },
                {
                    key: Enum.Menu.product.key,
                    label: Enum.Menu.product.label,
                    icon: <SharedIcon.Product />,
                    children: [
                        {
                            key: Enum.Menu.products.key,
                            label: Enum.Menu.products.label,
                        },
                        {
                            key: Enum.Menu.productCategory.key,
                            label: Enum.Menu.productCategory.label,
                        },
                    ],
                    
                },
                {
                    key: Enum.Menu.partner.key,
                    label: Enum.Menu.partner.label,
                    icon: <SharedIcon.Partner />,
                },
                {
                    key: Enum.Menu.order.key,
                    label: Enum.Menu.order.label,
                    icon: <SharedIcon.Order />,
                },
                {
                    key: Enum.Menu.shipment.key,
                    label: Enum.Menu.shipment.label,
                    icon: <SharedIcon.Shipment />,
                    children: [
                        {
                            key: Enum.Menu.batch.key,
                            label: Enum.Menu.batch.label,
                        },
                        {
                            key: Enum.Menu.shipments.key,
                            label: Enum.Menu.shipments.label,
                        },
                        {
                            key: Enum.Menu.vehicles.key,
                            label: Enum.Menu.vehicles.label,
                        },
                    ],
                },
                {
                    key: Enum.Menu.setting.key,
                    label: Enum.Menu.setting.label,
                    icon: <SharedIcon.Setting />,
                    children: [
                        {
                            key: Enum.Menu.user.key,
                            label: Enum.Menu.user.label,
                        },
                    ],
                },
            ];
    }

    if (currentUser.authorities.includes(Enum.UserRole.USER)) {
        menuItems = [
            {
                key: Enum.Menu.product.key,
                label: Enum.Menu.product.label,
                icon: <SharedIcon.Product />,
                children: [
                    {
                        key: Enum.Menu.products.key,
                        label: Enum.Menu.products.label,
                    },
                    {
                        key: Enum.Menu.productCategory.key,
                        label: Enum.Menu.productCategory.label,
                    },
                ],
                
            },
            {
                key: Enum.Menu.order.key,
                label: Enum.Menu.order.label,
                icon: <SharedIcon.Order />,
            },
            {
                key: Enum.Menu.batch.key,
                label: Enum.Menu.batch.label,
                icon: <SharedIcon.Shipment />,
            },
            {
                key: Enum.Menu.shipments.key,
                label: Enum.Menu.shipments.label,
                icon: <SharedIcon.Shipment />,
            },
            {
                key: Enum.Menu.vehicles.key,
                label: Enum.Menu.vehicles.label,
                icon: <SharedIcon.Partner />,
            },
        ];
    }

    return menuItems;
}

export {SiderMenu}
