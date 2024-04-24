import "../../styles/pages/detailpage.css";
import SupplierActions from "./Actions";
import { Typography } from "antd";
import convertTimestamp from "../../utils/convertTimestamp";

function SupplierDetail({ supplier }) {
	if (!supplier) {
		return;
	}
	return (
		<article className="detail-wrapper">
			<div className="action">
				<SupplierActions supplier={supplier} />
			</div>

			<div className="field">
				<Typography.Title level={4}>Name:</Typography.Title>
				<p>{supplier.name || "---"}</p>
			</div>
			<div className="field">
				<Typography.Title level={4}>Description:</Typography.Title>
				<p>{supplier.description || "---"}</p>
			</div>
			<div className="field">
				<Typography.Title level={4}>Address:</Typography.Title>
				<p>{supplier.address || "---"}</p>
			</div>
			<div className="field">
				<Typography.Title level={4}>Email:</Typography.Title>
				<p>{supplier.email || "---"}</p>
			</div>
			<div className="field">
				<Typography.Title level={4}>Phone number:</Typography.Title>
				<p>{supplier.phone || "---"}</p>
			</div>
			<div className="field">
				<Typography.Title level={4}>Created at:</Typography.Title>
				<p>{supplier.createdAt ? convertTimestamp(supplier.createdAt) : "---"}</p>
			</div>
			<div className="field">
				<Typography.Title level={4}>Last modified at:</Typography.Title>
				<p>{supplier.modifiedAt ? convertTimestamp(supplier.modifiedAt) : "---"}</p>
			</div>
		</article>
	);
}

export default SupplierDetail;
