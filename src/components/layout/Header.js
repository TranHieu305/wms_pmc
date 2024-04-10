import { Badge } from "antd";
import "../../styles/layout.css";
import { BellFilled } from "@ant-design/icons";

function Header() {
	return (
		<div className="header">
			<div className="notification">
				<Badge count={1}>
					<BellFilled style={{ fontSize: 18 }} />
				</Badge>
				Notification
			</div>
		</div>
	);
}

export default Header;
