import BatchBoardPage from "../services/Batch/pages/BatchBoardPage";
import BatchDetailPage from "../services/Batch/pages/BatchDetailPage";

const batchRouter = [
	{ path: "/batches", element: <BatchBoardPage /> },
	{ path: "/batches/:batchId", element: <BatchDetailPage /> },
];

export default batchRouter;
