import { Outlet } from "react-router-dom";
import SidebarMenu, { SiderMenu } from "./SidebarMenu";
import MainHeader from "./MainHeader";
import { Layout } from "antd";
import { Header } from "antd/es/layout/layout";

function PageLayout() {
	return (
		<>
            {/* <Layout class="min-h-screen">
                <SiderMenu />
                <Layout>
                    <Header
                        style={{
                            padding: 0,
                            background: "#FFFFFF",
                        }}
                    />
                </Layout>
           
            </Layout> */}
            <SidebarMenu />
			<div className="page-content">
				<MainHeader />
				<div className="main-content">
					<Outlet />
				</div>
			</div>
		</>
	);
}

export default PageLayout;