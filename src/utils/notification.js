import { notification } from "antd";

function notificationSuccess({ message = "Successfully", description, duration = 2 }) {
	return notification.success({ message, description, duration });
}

function notificationError({ message = "Error", description, duration = 3 }) {
	return notification.error({ message, description, duration });
}

export { notificationError, notificationSuccess };
