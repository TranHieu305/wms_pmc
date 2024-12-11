import { Outlet } from "react-router-dom";
import { SiderMenu } from "./SidebarMenu";
import MainHeader from "./MainHeader";
import { Layout } from "antd";
import { Header } from "antd/es/layout/layout";

function AppLayout() {
	return (
		<>
            <Layout className="h-screen">
                <SiderMenu />
                <Layout>
                    <Header
                        style={{
                            padding: 0,
                            background: "#FFFFFF",
                        }}
                    />
                    <div className="main-content">
                        <Outlet />
                    </div>
                </Layout>
            </Layout>
		</>
	);
}

function DetailPageLayout({children}) {
    return (<div>{children}</div>)
}

export default AppLayout;

export {DetailPageLayout};