import "./index.css";

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

export { DetailSection, DetailField };
