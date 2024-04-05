import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/sidebar";

const router = createBrowserRouter([{ path: "/", element: <Sidebar /> }]);

function App() {
	return <RouterProvider router={router}> </RouterProvider>;
}

export default App;
