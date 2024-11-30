import { Outlet } from "react-router-dom";
import { Header, SideMenu } from "../../components/layout";
import SidebarMenu from "./SidebarMenu";

function PageLayout() {
	return (
		<>
			{/* <SideMenu /> */}
            <SidebarMenu />
			{/* <div className="page-content">
				<Header />
				<div className="main-content">
					<Outlet />
				</div>
			</div> */}
		</>
	);
}

export default PageLayout;