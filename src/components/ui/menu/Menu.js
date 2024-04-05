import { ChevronFirst } from "lucide-react";
import { useState } from "react";

export default function Menu({ children }) {
	const [expanded, setExpanded] = useState(true);

	function handleExpanded() {
		setExpanded((cur) => !cur);
	}

	return (
		<aside className="h-screen">
			<nav className="h-full w-[250px] flex flex-col bg-white border-r shadow-sm">
				<button onClick={handleExpanded}>
					<ChevronFirst />
				</button>
				<ul>{children}</ul>
			</nav>
			<ul className="flex-1 px-3">{children}</ul>
		</aside>
	);
}
