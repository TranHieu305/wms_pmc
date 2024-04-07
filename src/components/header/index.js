import Title from "antd/es/typography/Title";
import "./index.css";

export default function Header({ children, ...props }) {
	let title;
	if (props.title) {
		title = <Title className="title">{props.title}</Title>;
	}

	let subtitle;
	if (props.subtitle) {
		subtitle = (
			<Title level={5} className="subtitle">
				{props.subtitle}
			</Title>
		);
	}

	return (
		<div className="ui-header">
			<div className="wrapper">
				{title}
				{subtitle}
				{children}
			</div>
		</div>
	);
}
