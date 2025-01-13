import ShipmentBoardPage from "../services/Shipment/pages/ShipmentBoardPage";

const shipmentRouter = [
	{ path: "/shipments", element: <ShipmentBoardPage /> },

	// {
	// 	path: "/shipments/:shipmentId",
	// 	element: <ShipmentDetailPage />,
	// },
];

export default shipmentRouter;
