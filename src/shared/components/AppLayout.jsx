import { Outlet } from "react-router-dom";
import { SiderMenu } from "./SidebarMenu";
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
                            boxShadow: "0px 4px 8px 0px rgba(145, 158, 171, 0.16)",
                        }}
                    />
                    <div>
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