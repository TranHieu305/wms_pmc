import { RouterProvider } from "react-router-dom";
import "./styles/index.css";
import appRouter from "./routes";

function App() {
	return (
		<div className="app">
			<RouterProvider router={appRouter}> </RouterProvider>
		</div>
	);
}

export default App;
