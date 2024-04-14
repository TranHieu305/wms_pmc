import "../../styles/pages/detailpage.css";
import CustomerActions from "./Actions";
import { Typography } from "antd";
import convertTimestamp from "../../utils/convertTimestamp";

function CustomerDetail({ customer }) {
	if (!customer) {
		return;
	}
	return (
		<article className="detail-wrapper">
			<div className="action">
				<CustomerActions customer={customer} />
			</div>

			<div className="field">
				<Typography.Title level={4}>Name:</Typography.Title>
				<p>{customer.name}</p>
			</div>
			<div className="field">
				<Typography.Title level={4}>Description:</Typography.Title>
				<p>{customer.description}</p>
			</div>
			<div className="field">
				<Typography.Title level={4}>Address:</Typography.Title>
				<p>{customer.address}</p>
			</div>
			<div className="field">
				<Typography.Title level={4}>Email:</Typography.Title>
				<p>{customer.email}</p>
			</div>
			<div className="field">
				<Typography.Title level={4}>Phone number:</Typography.Title>
				<p>{customer.phone}</p>
			</div>
			<div className="field">
				<Typography.Title level={4}>Longitude:</Typography.Title>
				<p>{customer.longitude}</p>
			</div>
			<div className="field">
				<Typography.Title level={4}>Latitude:</Typography.Title>
				<p>{customer.latitude}</p>
			</div>
			<div className="field">
				<Typography.Title level={4}>Created at:</Typography.Title>
				<p>{customer.createdAt ? convertTimestamp(customer.createdAt) : "---"}</p>
			</div>
			<div className="field">
				<Typography.Title level={4}>Last modified at:</Typography.Title>
				<p>{customer.modifiedAt ? convertTimestamp(customer.modifiedAt) : "---"}</p>
			</div>
		</article>
	);
}

export default CustomerDetail;
