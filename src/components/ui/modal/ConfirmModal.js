import { Button, Modal } from "antd";

function ModalConfirmGlobal({ title, content, onConfirm, children }) {
	const openModal = () => {
		Modal.confirm({
			title: title,
			content: content,
			onOk: onConfirm,
		});
	};

	return (
		<Button type="dash" onClick={openModal}>
			{children}
		</Button>
	);
}

export default ModalConfirmGlobal;
