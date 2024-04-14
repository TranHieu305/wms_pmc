import { Space, Input, Button } from "antd";
import "../../styles/board.css";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { CustomerBoard } from "../../components/customer";

const { Search } = Input;

function CustomerBoardPage() {
	const navigate = useNavigate();

	const handleCreate = () => {
		navigate("create");
	};

	return (
		<div className="board">
			<Space size={20} direction="vertical" className="board-container">
				<div className="board-title">Customers</div>
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
				<CustomerBoard />
			</Space>
		</div>
	);
}

export default CustomerBoardPage;
