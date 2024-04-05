import { ChevronFirst } from "lucide-react";
import "./index.css";

export default function Menu({ children }) {
	return (
		<aside className="ui-menu">
			<nav className="content-wrapper">
				<button>
					<ChevronFirst />
				</button>
				<ul>{children}</ul>
			</nav>
		</aside>
	);
}
