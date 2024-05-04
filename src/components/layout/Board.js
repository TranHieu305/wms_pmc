import { Space } from "antd";
import "../../styles/board.css";

function BoardLayout({ children, title }) {
	return (
		<div className="board">
			<Space size={20} direction="vertical" className="board-container">
				<div className="board-title">{title}</div>
				<BoardLayoutAction />
				{children}
			</Space>
		</div>
	);
}

function BoardLayoutAction({ children }) {
	return <div className="board-action">{children}</div>;
}

function BoardLayoutContent({ children }) {
	return <div>{children}</div>;
}

export { BoardLayout, BoardLayoutAction, BoardLayoutContent };
