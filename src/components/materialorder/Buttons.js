import { Button } from "antd";
import { useNavigate } from "react-router-dom";

function ButtonSave({ label, order, ...props }) {
	const navigate = useNavigate();
	function handleOpen() {
		if (!order) {
			navigate("/create");
		} else {
			navigate("/" + order.id + "/edit");
		}
	}
	return (
		<Button onClick={handleOpen} {...props}>
			{label}
		</Button>
	);
}

export { ButtonSave };
