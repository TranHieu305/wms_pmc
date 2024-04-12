import { Typography } from "antd";
import "../../styles/pages/detailpage.css";
import WarehouseActions from "./Actions";

function WarehouseDetail({ warehouse }) {
	return (
		<article className="detail-wrapper">
			<div className="action">
				<WarehouseActions warehouse={warehouse} />
			</div>

			<div className="field">
				<Typography.Title level={4}>Name:</Typography.Title>
				<p>{warehouse.name}</p>
			</div>
			<div className="field">
				<Typography.Title level={4}>Description:</Typography.Title>
				<p>{warehouse.description}</p>
			</div>
			<div className="field">
				<Typography.Title level={4}>Address:</Typography.Title>
				<p>{warehouse.address}</p>
			</div>
			<div className="field">
				<Typography.Title level={4}>Supervisor:</Typography.Title>
				<p>{warehouse.supervisor || "--"}</p>
			</div>
			<div className="field">
				<Typography.Title level={4}>Longitude:</Typography.Title>
				<p>{warehouse.longitude}</p>
			</div>
			<div className="field">
				<Typography.Title level={4}>Latitude:</Typography.Title>
				<p>{warehouse.latitude}</p>
			</div>
		</article>
	);
}

export default WarehouseDetail;
