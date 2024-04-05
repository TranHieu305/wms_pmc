import { Link } from "react-router-dom";

export default function MenuItem({ icon, title, path = "" }) {
	return (
		<li className="ui-menuitem">
			<Link to={path}>
				<div className="icon">{icon}</div>
				<div className="title">{title}</div>
			</Link>
		</li>
	);
}
