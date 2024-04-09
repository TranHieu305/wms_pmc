import { Badge } from "antd";
import "../../styles/layout.css";
import { BellFilled } from "@ant-design/icons";
import Typography from "antd/es/typography/Typography";

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
