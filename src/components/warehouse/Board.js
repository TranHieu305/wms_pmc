import { Space, Typography, Table, Button } from "antd";
import { API_BASE_URL } from "../../apis";
import { useFetch } from "../../custom_hooks";
import "../../styles/board.css";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const requestConfig = {};

export default function WarehouseBoard() {
	const { data, error, loading } = useFetch(`${API_BASE_URL}/warehouses`);
	console.log("data:", data);
	console.log("loading:", loading);

	const navigate = useNavigate();

	const handleCreate = () => {
		navigate("create");
	};

	return (
		<Space size={20} direction="vertical">
			<Typography.Title level={4}>warehouses</Typography.Title>
			<Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
				Add new
			</Button>
			<Table
				className="board-table"
				loading={loading}
				dataSource={data}
				columns={[
					{
						title: "name",
						dataIndex: "name",
						width: "50%",
					},
					{
						title: "name",
						dataIndex: "name",
					},
					{
						title: "name",
						dataIndex: "name",
					},
					{
						title: "name",
						dataIndex: "name",
					},
					{
						title: "name",
						dataIndex: "name",
					},
				]}
			></Table>
		</Space>
	);
}
