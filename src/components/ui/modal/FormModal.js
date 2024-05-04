import { Button, Modal } from "antd";
import { FormAction, FormGlobal } from "../form";
import "./index.css";

function FormModal({
	children,
	open,
	onSubmit,
	textSubmit = "Submit",
	onCancel,
	textCancel = "Cancel",
	title,
	loading,
}) {
	return (
		<Modal
			centered
			title={title}
			open={open}
			footer={null}
			onCancel={onCancel}
			className="form-modal"
		>
			<FormGlobal onSubmit={onSubmit}>
				{children}
				<FormAction>
					<Button type="primary" htmlType="submit" loading={loading}>
						{textSubmit}
					</Button>
					<Button type="dash" onClick={onCancel}>
						{textCancel}
					</Button>
				</FormAction>
			</FormGlobal>
		</Modal>
	);
}

export default FormModal;
