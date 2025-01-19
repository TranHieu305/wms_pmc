import { Outlet } from "react-router-dom";
import { SiderMenu } from "./AppMenu";
import { Layout } from "antd";
import { createContext, useContext, useState } from "react";
import AppHeader from "./AppHeader";
 
const LayoutContext = createContext();

const LayoutProvider = ({children}) => {
    const [openMenuKey, setOpenMenuKey] = useState([]);
    const [selectedMenuKey, setSelectedMenuKey] = useState();
    const [breadcrumbItems, setBreadcrumbItems] = useState([]);

    return (
        <LayoutContext.Provider value={{
            selectedMenuKey, 
            setSelectedMenuKey,
            breadcrumbItems,
            setBreadcrumbItems,
            openMenuKey,
            setOpenMenuKey
            }}>   
            {children}
        </LayoutContext.Provider>
    )
}

export const useLayoutContext = () => useContext(LayoutContext);

function AppLayout() {
	return (
		<LayoutProvider>
            <Layout className="min-h-screen">
                <SiderMenu />
                <Layout>
                    <AppHeader />
                    <div>
                        <Outlet />
                    </div>
                </Layout>
            </Layout>
		</LayoutProvider>
	);
}

export default AppLayout;

