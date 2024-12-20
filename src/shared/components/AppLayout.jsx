import { Outlet } from "react-router-dom";
import { SiderMenu } from "./SidebarMenu";
import { Avatar, Dropdown, Layout } from "antd";
import { Header } from "antd/es/layout/layout";
import { UserOutlined } from "@ant-design/icons";
import LogoutBtn from "../../services/Auth/components/AuthButton";

function AppLayout() {
	return (
		<>
            <Layout className="h-screen">
                <SiderMenu />
                <Layout>
                    <AppHeader />
                    <div>
                        <Outlet />
                    </div>
                </Layout>
            </Layout>
		</>
	);
}

function AppHeader() {
    return (
        <Header
            style={{
                padding: 0,
                background: "#FFFFFF",
                boxShadow: "0px 4px 8px 0px rgba(145, 158, 171, 0.16)",
            }}
        >
            <div className="px-6 flex items-center justify-between">
                <div></div>
                <div>
                    <AvatarDropdown />
                </div>
            </div>
        </Header>
    );
}

function AvatarDropdown() {
    const items = [
        {
            key: 'logout',
            label: <LogoutBtn />,
        },
    ];

    return (
        <Dropdown
            menu={{
                items,
            }}
            placement="bottomRight"
        >
            <Avatar 
                style={{backgroundColor: '#87d068',}}
                icon={<UserOutlined />}
            />
        </Dropdown>
    );
}



export default AppLayout;

