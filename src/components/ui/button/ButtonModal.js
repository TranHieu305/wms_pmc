import { Button, Modal } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";

function ButtonModalConfirm({
	title,
	content,
	typeConfirm,
	onConfirm,
	onCancel,
	okText = "Ok",
	cancelText = "Cancel",
	children,
	...props
}) {
	const { confirm } = Modal;

	const showConfirm = () => {
		confirm({
			title: title,
			icon: <ExclamationCircleFilled />,
			content: content,
			onOk: onConfirm,
			okCancel: onCancel,
			okText: okText,
			cancelText: cancelText,
			okType: typeConfirm === "delete" ? "danger" : "default",
			centered: true,
		});
	};

	return (
		<Button onClick={showConfirm} {...props}>
			{children}
		</Button>
	);
}

export { ButtonModalConfirm };
