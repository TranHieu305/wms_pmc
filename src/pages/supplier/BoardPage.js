import { Space, Input, Button } from "antd";
import "../../styles/board.css";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { SupplierBoard } from "../../components/supplier";

const { Search } = Input;

function SupplierBoardPage() {
	const navigate = useNavigate();

	const handleCreate = () => {
		navigate("create");
	};

	return (
		<div className="board">
			<Space size={20} direction="vertical" className="board-container">
				<div className="board-title">Suppliers</div>
				<div className="board-action">
					<Search placeholder="Search warehouse" className="board-search"></Search>
					<Button
						type="primary"
						icon={<PlusOutlined />}
						onClick={handleCreate}
						className="board-button"
					>
						Add new
					</Button>
				</div>
				<SupplierBoard />
			</Space>
		</div>
	);
}

export default SupplierBoardPage;
