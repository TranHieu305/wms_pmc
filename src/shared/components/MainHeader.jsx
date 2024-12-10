import { Badge } from "antd";
import { BellFilled } from "@ant-design/icons";

function MainHeader() {
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

export default MainHeader;