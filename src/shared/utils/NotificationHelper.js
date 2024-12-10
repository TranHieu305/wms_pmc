import { notification } from "antd";

function showSuccessNotification({ message = "Successfully", description, duration = 2 }) {
	return notification.success({ message, description, duration });
}

function showErrorNotification({ message = "Error", description, duration = 3 }) {
	return notification.error({ message, description, duration });
}

export const notificationHelper = {
	showSuccessNotification,
	showErrorNotification,
};
