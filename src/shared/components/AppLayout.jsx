import { Outlet } from "react-router-dom";
import { SiderMenu } from "./SidebarMenu";
import { Avatar, Dropdown, Layout } from "antd";
import { Header } from "antd/es/layout/layout";
import LogoutBtn from "../../services/Auth/components/AuthButton";
import { useSelector } from "react-redux";
 

function AppLayout() {
	return (
		<>
            <Layout className="min-h-screen">
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
    const currentUser = JSON.parse(localStorage.getItem("user"));
    const users = useSelector((state) => state.users.userList);
    const user = users.find(user => user.id === currentUser.userId);
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
                size={36}
                src={user?.avatarUrl}
            >
                {user?.username?.charAt(0).toUpperCase() || "U"}
            </Avatar>
        </Dropdown>
    );
}



export default AppLayout;

