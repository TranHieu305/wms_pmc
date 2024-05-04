import { Button, Modal } from "antd";

function ModalGlobal({
	children,
	open,
	onOk,
	onCancel,
	title,
	footer,
	textOk = "OK",
	textCancel = "CANCEL",
	isLoadingOK = false,
	width = 650,
}) {
	return (
		<Modal
			centered
			title={<div style={{ fontSize: "24px" }}>{title}</div>}
			width={width}
			open={open}
			onOk={onOk}
			onCancel={onCancel}
			footer={
				footer || [
					<Button key="back" onClick={onCancel}>
						{textCancel}
					</Button>,
					<Button
						key="submit"
						type="primary"
						htmlType="submit"
						loading={isLoadingOK}
						onClick={onOk}
					>
						{textOk}
					</Button>,
				]
			}
		>
			{children}
		</Modal>
	);
}

export default ModalGlobal;
