import "./index.css";
import { Col, Row } from "antd";

function DetailSection({ children }) {
	return <div className="detail-section">{children}</div>;
}

function DetailField({ children, title }) {
	return (
		<div className="detail-field">
			<div className="detail-field-title">{title}</div>
			{children}
		</div>
	);
}

function DetailTitleBox({ headline, des }) {
	return (
		<div className="detail-tilte-box">
			<div className="headline">{headline}</div>
			<div className="des">{des}</div>
		</div>
	);
}

function DetailRow({ title, data, main }) {
	const classNameTitle = main ? "title-main" : "title";
	return (
		<div className="detail-row">
			<Row>
				<Col span={12} className={classNameTitle}>
					<DetailField title={title}></DetailField>
				</Col>
				<Col style={{ textAlign: "right" }} span={12} className="data">
					<DetailField title={data}></DetailField>
				</Col>
			</Row>
		</div>
	);
}

export { DetailSection, DetailField, DetailTitleBox, DetailRow };
