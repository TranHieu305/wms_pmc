export default function SubMenu({ children, icon, title, dropdown = false }) {
	return (
		<li className="ui-submenu">
			<div className="icon">{icon}</div>
			<div className="title">{title}</div>
		</li>
	);
}
