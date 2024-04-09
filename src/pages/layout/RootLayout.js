import { Outlet } from "react-router-dom";
import { Header, SideMenu } from "../../components/layout";

function RootLayout() {
	return (
		<>
			<SideMenu />
			<div className="page-content">
				<Header />
				<div className="main-content">
					<Outlet />
				</div>
			</div>
		</>
	);
}

export default RootLayout;
