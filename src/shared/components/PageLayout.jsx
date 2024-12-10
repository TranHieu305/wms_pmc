import { Outlet } from "react-router-dom";
import SidebarMenu from "./SidebarMenu";
import MainHeader from "./MainHeader";

function PageLayout() {
	return (
		<>
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