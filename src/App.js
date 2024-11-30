import { RouterProvider } from "react-router-dom";
import "./styles/index.css";
import appRouter from "./routes";
import { ModalProvider } from "./shared/components/ModalProvider";

function App() {
	return (
		<div className="app">
			<ModalProvider>
				<RouterProvider router={appRouter}> </RouterProvider>
			</ModalProvider>
		</div>
	);
}

export default App;
